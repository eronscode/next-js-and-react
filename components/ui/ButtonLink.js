import Link from "next/link"
import classes from './ButtonLink.module.css'

function ButtonLink(props) {
    const {children, link} = props
    return (
        <Link href={link}>
            <a className={classes.btn}>{children}</a>
        </Link>
    )
}



export default ButtonLink

