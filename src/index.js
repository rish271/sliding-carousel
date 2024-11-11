import React, {useState, useEffect, useRef} from 'react'
import ReactDOM from 'react-dom'
import './carousel.css' // Import CSS for styling

const images = [
  'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGxhbmRzY2FwZXxlbnwwfHx8fDE2NzkxMzQ5NjI&ixlib=rb-1.2.1&q=80&w=1080',
  'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDl8fGxhbmRzY2FwZXxlbnwwfHx8fDE2NzkxMzQ5NjM&ixlib=rb-1.2.1&q=80&w=1080',
  'https://images.unsplash.com/photo-1560769629-975ec94e6a86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDZ8fGxhbmRzY2FwZXxlbnwwfHx8fDE2NzkxMzQ5NjQ&ixlib=rb-1.2.1&q=80&w=1080',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fHNlYXx8ZW58MHx8fHx8MTY3OTEzNDk2NQ&ixlib=rb-1.2.1&q=80&w=1080',
]

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const intervalRef = useRef(null)

  const slideLength = images.length
  const autoSlideInterval = 3000 // Auto-slide every 3 seconds

  // Next slide
  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slideLength)
  }

  // Previous slide
  const goToPreviousSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slideLength) % slideLength)
  }

  // Set up auto-slide with useEffect and setInterval
  useEffect(() => {
    intervalRef.current = setInterval(goToNextSlide, autoSlideInterval)

    // Clear the interval on component unmount
    return () => clearInterval(intervalRef.current)
  }, [])

  // Manually navigate to a specific slide
  const goToSlide = (index) => {
    setCurrentIndex(index)
  }
  // useEffect(() => {
  //   console.log(currentIndex, 'current')
  // }, [currentIndex])

  return (
    <div className="carousel">
      {/* Slide images */}
      <div className="carousel-slides">
        {images.map((image, index) => {
          const isActive = index === currentIndex
          console.log(`Slide ${index} is ${isActive ? 'active' : 'inactive'}`)
          return (
            <div
              key={index}
              className={`carousel-slide ${
                index === currentIndex ? 'active' : ''
              }`}
              style={{backgroundImage: `url(${image})`}}
            />
          )
        })}
      </div>

      {/* Navigation arrows */}
      <button className="carousel-arrow left" onClick={goToPreviousSlide}>
        ❮
      </button>
      <button className="carousel-arrow right" onClick={goToNextSlide}>
        ❯
      </button>

      {/* Dots or indicators */}
      <div className="carousel-indicators">
        {images.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default App

ReactDOM.render(<App />, document.getElementById('root'))
