import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__stack">
          <div>
            <figure className="footer__logo" aria-hidden="true">
              <img className="footer__img" src="/movie.png" alt="" />
            </figure>
          </div>
          <div className="footer__copyright">
            Copyright © 2026 Theater6 Steven Frasica
          </div>
          <a
            className="footer__attribution"
            href="https://www.flaticon.com/free-icons/movie"
            title="movie icons"
            target="_blank"
            rel="noreferrer"
          >
            Movie icon created by Freepik - Flaticon
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;