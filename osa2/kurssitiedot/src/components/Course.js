const Course = ({course}) =>{
    return (
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }

  const Header = (props) => {
    return (
      <div>
        <h2>{props.course}</h2>
      </div>
    )
  }
  
  const Part = ({name, exercises}) => {
    return (
      <div>
        <p>{name} {exercises}</p>
      </div>
    )
  }
  
  const Content = ({parts}) => {
    return (
      <div>
        {parts.map(e => <Part key={e.id} name={e.name} exercises={e.exercises}/>)}
      </div>
    )
  }
  
  const Total = ({parts}) => {
    const sum = parts.reduce((summ, part) => {
      return summ + part.exercises
    }, 0)
    return (
      <b>Total number of exercises: {sum}</b>
    )
  }

export default Course