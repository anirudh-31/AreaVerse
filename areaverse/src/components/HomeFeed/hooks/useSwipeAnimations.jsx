import { useCallback, useEffect, useRef } from "react"
import { triggerHaptic } from "../../../utils/CommonFunctions";

export const useSwipeAnimation = (onSwipe, enabled) => {
    const cardRef        = useRef(null);
    const animationFrame = useRef(null); 
    const animatedStyles = useRef({
        parallax: {},
        viewIcon: {},
        content : {},
    }).current;
    const springCoeff    = 0.1;
    const frictionCoeff  = 0.85;
    const state          = useRef({
        isDragging    : false,
        swiped        : false,
        swipeDirection: null,
        startX        : 0,
        startY        : 0,
        posX          : 0,
        posY          : 0,
        velocityX     : 0,
        velocityY     : 0,
        targetX       : 0,
        targetY       : 0,
        rotation      : 0,
        rotationX     : 0,
        rotationY     : 0,
        targetRotateX : 0,
        targetRotateY : 0,
    }).current;

    
    const animationLoop = useCallback(() => {
        if(!cardRef.current) return;

        // Computing delta change between target position and current position.
        const dX = state.targetX - state.posX;
        const dY = state.targetY - state.posY;

        // Computing delta change between target rotational position and current rotational position.
        const dRotateX = state.targetRotateX - state.rotationX;
        const dRotateY = state.targetRotateY - state.rotationY

        // For bounce
        const aX       = dX * springCoeff;
        const aY       = dY * springCoeff;
        const aRotateX = dRotateX * springCoeff;
        const aRotateY = dRotateY * springCoeff;

        // Computing 'swipe' speed.
        state.velocityX += aX;
        state.velocityY += aY;
        state.rotationX += aRotateX;
        state.rotationY += aRotateY;

        // For stickiness
        state.velocityX *= frictionCoeff;
        state.velocityY *= frictionCoeff;
        state.rotationX *= frictionCoeff;
        state.rotationY *= frictionCoeff;

        // computing X, Y co-ordinates
        state.posX += state.velocityX;
        state.posY += state.velocityY;

        // Rotation for realistic swipe.
        state.rotation = state.posX * 0.05;

        // appending style transforms.
        cardRef.current.style.transform = `translate(${state.posX}px, ${state.posY}px) rotate(${state.rotation}deg) rotateX(${state.rotationX}deg) rotateY(${state.rotationY}deg)`;

        // Calculating parallax.
        const parallaxX = state.rotationY * -0.5;
        const parallaxY = state.rotationX * -0.5;
        animatedStyles.parallax.transform = `translate(${parallaxX}px, ${parallaxY}px)`;

        const viewOpacity    =  Math.min(Math.abs(state.posX) / (window.innerWidth / 4), 1);
        const contentOpacity =   1 - ( viewOpacity * 0.7 );
        const viewScale      = 0.5 + ( viewOpacity * 0.5 );

        animatedStyles.viewIcon.opacity   = ( state.posX > 10 || state.posX < -10) ? viewOpacity : 0;
        animatedStyles.viewIcon.transform = `scale(${viewScale})`;
        animatedStyles.content.opacity    = contentOpacity;

        const parallaxElement = cardRef.current.querySelector('.parallax-content');
        const viewIconElement = cardRef.current.querySelector('.view-icon-container');

        if(parallaxElement) parallaxElement.style.transform = animatedStyles.parallax.transform;
        if(viewIconElement) {
            viewIconElement.style.opacity   = animatedStyles.viewIcon.opacity;
            viewIconElement.style.transform = animatedStyles.viewIcon.transform;
        }
        if(parallaxElement) parallaxElement.style.opacity = animatedStyles.content.opacity;
        // handling situation where user is swiping on the card
        if( state.swiped && (Math.abs(state.posX) > window.innerWidth || Math.abs(state.posY) > window.innerHeight)) {
            onSwipe(state.swipeDirection);
            return;
        }

        // reset value when card is static.
        if( !state.isDragging && !state.swiped && Math.abs(state.posX) < 0.5 && Math.abs(state.posY) < 0.5){
            state.posX = state.posY = state.targetX = state.targetY = state.velocityX = state.velocityY = state.rotation = 0;
            cardRef.current.style.transform = 'translate(0,0) rotate(0)';
        } else {
            animationFrame.current = requestAnimationFrame(animationLoop);
        }
    }, [state, onSwipe, animatedStyles]);

    const onDragStart = useCallback(( e ) => {
        if (!cardRef.current) return;
        state.swiped     = false;
        state.isDragging = true;

        cardRef.current.style.transition = 'none';
        state.startX = e.pageX || e.touches[0].pageX;
        state.startY = e.pageY || e.touches[0].pageY;

        cancelAnimationFrame(animationFrame.current);
        animationFrame.current = requestAnimationFrame(animationLoop);

    }, [state, animationLoop]);

    const onDragMove = useCallback(( e ) => {
        if( !state.isDragging || !cardRef.current) return;
        e.preventDefault();
        
        const currentX = e.pageX || e.touches[0].pageX;
        const currentY = e.pageY || e.touches[0].pageY;
        
        state.targetX = ( currentX - state.startX );
        state.targetY = ( currentY - state.startY );
        
        const rect   = cardRef.current.getBoundingClientRect();
        const mouseX = currentX - rect.left;
        const mouseY = currentY - rect.top;

        state.targetRotateY = ( mouseX / rect.width  - 0.5 ) * -30;
        state.targetRotateX = ( mouseY / rect.height - 0.5 ) *  30;

    }, [state]);

    const onDragEnd = useCallback(() => {
        if(!state.isDragging || !cardRef.current) return;

        state.isDragging        = false;
        state.targetRotateX     = 0;
        state.targetRotateY     = 0;
        const threshold         = window.innerHeight / 4;
        const verticalThreshold = window.innerHeight / 5;

        state.swipeDirection = null;

        // Determining the direction in which the user is trying to swipe.
        if( Math.abs(state.posX) > threshold || Math.abs(state.velocityX) > 5){
            state.swipeDirection = state.posX > 0 ? 'right' : 'left';
        } else if ( state.posY < -verticalThreshold && Math.abs(state.velocityY) > 5) {
            state.swipeDirection = 'up';
        }

        if(state.swipeDirection){
            state.swiped = true;
            const flyoutMultiplyer = 15;

            state.targetX = state.posX + state.velocityX * flyoutMultiplyer;
            state.targetY = state.posY + state.velocityY * flyoutMultiplyer;
            triggerHaptic('light');
        }else{
            state.targetX = 0;
            state.targetY = 0;
        }
    }, [state]);

    useEffect(() => {
        if(!enabled) return; // Only attach listeners if the hook is enabled;
        const card =  cardRef.current;
        
        if(!card) return;

        card.addEventListener('mousedown' , onDragStart);
        card.addEventListener('touchstart', onDragStart, { passive: true });

        document.addEventListener('mousemove', onDragMove);
        document.addEventListener('touchmove', onDragMove, { passive: true });

        document.addEventListener('mouseup' , onDragEnd);
        document.addEventListener('touchend', onDragEnd);

        return () => {
            card.removeEventListener('mousedown' , onDragStart); 
            card.removeEventListener('touchstart', onDragStart);

            document.removeEventListener('mousemove', onDragMove);
            document.removeEventListener('touchmove', onDragMove);

            document.removeEventListener('mouseup' , onDragEnd);
            document.removeEventListener('touchend', onDragEnd);

            cancelAnimationFrame(animationFrame.current);
        };
    }, [onDragStart, onDragMove, onDragEnd, enabled]);

    return {cardRef};
}