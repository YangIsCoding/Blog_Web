import Link from "next/link";
const NotFound = () => { 
    return (
        <div>
            <h1>404 - Page Not Found</h1>
            <h2>the page you are looking for does not exist</h2>
            <Link href ="/"> Return Home</Link>
        </div>
    );
}

export default NotFound;