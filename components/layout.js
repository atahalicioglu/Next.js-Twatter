import Nav from './Nav';

export default function Layout({ children }) {
    return(
        <div className='mx-6 font-poppins'>
            <Nav />
            <main>{children}</main>
        </div>
    )
}

