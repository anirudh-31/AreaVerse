export const styles = {
    cardStack: {
        flexGrow      : 1,
        position      : 'relative',
        perspective   : '1000px',
        display       : 'flex',
        alignItems    : 'center',
        justifyContent: 'center',
        minHeight     : 0,
    },
    postCard: {
        backgroundColor     : 'var(--form-card-color)',
        backgroundSize      : '400% 400%',
        animation           : 'aurora 10s ease infinite',
        backdropFilter      : 'blur(15px)',
        WebkitBackdropFilter: 'blur(15px)',
        borderRadius        : 'var(--card-radius)',
        boxShadow           : '0 8px 32px 0 var(--shadow-color-dark), inset 0 0 0 1px var(--inset-border-color)',
        border              : '1px solid var(--form-border-color)',
        position            : 'absolute',
        width               : '100%',
        minWidth            : '380px',
        flexGrow            : 1,
        minHeight           : '750px',
        height              : '100%',
        maxHeight           : '800px',
        display             : 'flex',
        flexDirection       : 'column',
        overflow            : 'hidden',
        touchAction         : 'none',
        willChange          : 'transform',
        transformStyle      : 'preserve-3d',        
    },
    contentContainer: {
        padding       : '20px',
        boxSizing     : 'border-box',
        flexGrow      : 1,
        display       : 'flex',
        flexDirection : 'column',
        overflowY     : 'auto',
        textShadow    : '0 1px 3px rgba(0,0,0,0.2)',
        zIndex        : 1,
        position      : 'relative',
        justifyContent: 'flex-end'
    },
    tintedOverlay: {
        background    : 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)',
        textShadow    : '0 2px 4px rgba(0,0,0,0.5)',
    },
    postHeader: {
        display      : 'flex',
        alignItems   : 'center',
        marginBottom : '15px',
        flexShrink   : 0,
        pointerEvents: 'none'
    },
    avatar: {
        width         : '40px',
        height        : '40px',
        borderRadius  : '50%',
        marginRight   : '12px',
        objectFit     : 'cover',
        alignItems    : 'center',
        display       : 'flex',
        justifyContent: 'center',
        fontWeight    : 'bold',
        fontWeight    : '1.05rem',
        pointerEvents : 'none'
    },
    userDetails: {
        display      : 'flex',
        flexDirection: 'column',
        pointerEvents: 'none'
    },
    username: {
        fontWeight   : 600,
        fontSize     : '1rem',
        color        : 'var(--color-text)',
        pointerEvents: 'none'
    },
    timestamp: {
        fontSize     : '0.8rem',
        color        : 'var(--color-text-muted)',
        pointerEvents: 'none'
    },
    textContent: {
        display      : 'flex', 
        flexDirection: 'column', 
    },
    tag: {
        pointerEvents: 'none',
        alignSelf    : 'flex-start',
        padding      : '5px 12px',
        borderRadius : '15px',
        fontSize     : '12px',
        fontWeight   : 600,
        marginBottom : '12px',
        transition   : 'background-color 0.3s ease, color 0.3s ease'
    },
    tagType: {
        issue: {
            backgroundColor: 'var(--color-error)',
            color          : 'var(--issue-text)'
        },
        query: {
            backgroundColor: 'var(--color-primary-alt)',
            color          : 'var(--event-text)'
        },
        general: {
            backgroundColor: 'var(--color-warning)',
            color          : 'var(--general-text)'
        }
    },
    postTitle: {
        fontSize  : '1.5rem',
        fontWeight: 'bold',
        lineHeight: 1.25,
        margin    : '0 0 8px 0',
    },
    postContent: { 
        fontSize  : '1rem', 
        lineHeight: 1.5, 
        margin    : 0, 
    },
    moreButton: {
        background: 'none',
        border    : 'none',
        color     : 'var(--color-text-muted)',
        cursor    : 'pointer',
        padding   : '0 4px',
        fontWeight: '600'
    },
    eventDetails: {
        fontSize     : '14px',
        borderTop    : '1px solid var(--search-bg)',
        paddingTop   : '10px',
        marginTop    : '10px',
        pointerEvents: 'none',
        flexShrink   : 0
    },
    loader: {
        textAlign: 'center',
        padding  : '50px 0',
        color    : 'var(--color-text-muted)'
    },
    viewIconContainer: { 
        position      : 'absolute', 
        top           : 0, 
        left          : 0, 
        right         : 0, 
        bottom        : 0, 
        display       : 'flex', 
        alignItems    : 'center', 
        justifyContent: 'center',
        opacity       : 0, 
        transition    : 'opacity 0.3s ease', 
        willChange    : 'opacity, transform' 
    },
    viewIconCircle: { 
        width          : '80px', 
        height         : '80px', 
        borderRadius   : '50%', 
        backgroundColor: 'rgba(var(--card-bg-start-rgba), 0.7)', 
        backdropFilter : 'blur(10px)', 
        display        : 'flex', 
        alignItems     : 'center', 
        justifyContent : 'center', 
        color          : 'var(--color-text)' 
    },
    viewIcon: {
        width : '32px',
        height: '32px',
    },
    progressBarContainer: { 
        position    : 'absolute', 
        top         : '10px', 
        left        : '10px', 
        right       : '10px', 
        display     : 'flex',
        gap         : '4px', 
        background  : 'rgba(0, 0, 0, 0.4)',
        padding     : '4px',
        borderRadius: '2px',
        zIndex      : 2 
    },
    progressBarSegment: { 
        flex           : 1, 
        height         : '4px', 
        backgroundColor: 'rgba(255, 255, 255, 0.3)', 
        borderRadius   : '2px', 
        overflow       : 'hidden' 
    },
    progressBarFill: { 
        height: '100%', 
        backgroundColor: 'rgba(255, 255, 255, 0.9)' 
    },
    navLeft: { 
        position: 'absolute', 
        left    : 0, 
        top     : 0, 
        bottom  : 0, 
        width: '30%', 
        zIndex: 1 
    },
    navRight: { 
        position: 'absolute', 
        right   : 0, 
        top     : 0, 
        bottom  : 0, 
        width   : '30%', 
        zIndex  : 1 ,
    },
    topLoader: {
        position       : 'absolute',
        top            : '1%',
        left           : '50%',
        transform      : 'translateX(-50%)',
        width          : '80%',
        maxWidth       : '300px',
        height         : '4px',
        backgroundColor: 'var(--color-panel)',
        borderRadius   : '2px',
        overflow       : 'hidden',
    },
    topLoaderBar: {
        width          : '100%',
        height         : '100%',
        backgroundImage: 'linear-gradient(90deg, transparent, var(--color-surface), transparent)',
        animation      : 'shimmer-loader 2s infinite linear',
    }
};