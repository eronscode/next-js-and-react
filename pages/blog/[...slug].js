
import { useRouter } from 'next/router'

function BlogSinglePostPage(props) {
    const router = useRouter();
    console.log(router.query)

    return (
        <div>
            <h1>Single post page</h1>
        </div>
    )
}



export default BlogSinglePostPage

