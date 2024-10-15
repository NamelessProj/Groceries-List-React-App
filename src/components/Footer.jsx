const Footer = ({length}) => {

    const today = new Date()

    return (
        <footer>
            <p>{length} {length <= 1 ? 'element' : 'elements'}</p>
            <p>By <a href="https://portfolio-psi-azure-25.vercel.app" target="_blank">Da Silva Pinto Kevin</a>. The source code is licensed &copy; {today.getFullYear()}.</p>
        </footer>
    );
};

export default Footer;