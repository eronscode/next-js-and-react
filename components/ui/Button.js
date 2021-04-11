import classes from './ButtonLink.module.css'

export default function Button(props) {
    const {onClick, children} = props
    return (
        <button onClick={onClick} className={classes.btn}>{children}</button>
    )
}
