import { styles } from '../styles/styles';

function ImageProgressBar({ count, currentIndex, isPaused }) {
  return (
    <div style={styles.progressBarContainer}>
        {
            Array.from({ length: count}).map(( _, index) =>  (
                <div key={index} style={styles.progressBarSegment}>
                    <div style={{
                        ...styles.progressBarFill,
                        width     : index === currentIndex ? '100%' : (index < currentIndex ? '100%' : '0%'),
                        transition: index === currentIndex && !isPaused ? 'width 4s linear' : 'none'
                    }}></div>
                </div>
            ))
        }
    </div>
  )
}

export default ImageProgressBar