const Course = ({ course }) => {
    const total = course.parts.reduce(
        (s, p) => {
            return s + p.exercises;
        }, 0
    );

    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total sum={total} />
        </div>
    );
}

const Header = ({ course }) => <h2>{course}</h2>;

const Total = ({ sum }) => <p><strong>total of {sum} exercises</strong></p>;

const Content = ({ parts }) =>
    <>
        {parts.map(part =>
            <Part key={part.id} part={part} />
        )}
    </>

const Part = ({ part }) =>
    <p>
        {part.name} {part.exercises}
    </p>

export default Course;