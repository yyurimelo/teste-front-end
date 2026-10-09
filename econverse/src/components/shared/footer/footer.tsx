import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';

import styles from './footer.module.scss';

const linkGroups = [
  {
    title: 'Institucional',
    links: ['Sobre Nós', 'Movimento', 'Trabalhe conosco'],
  },
  {
    title: 'Ajuda',
    links: ['Suporte', 'Fale Conosco', 'Perguntas Frequentes'],
  },
  {
    title: 'Termos',
    links: [
      'Termos e Condições',
      'Política de Privacidade',
      'Troca e Devolução',
    ],
  },
];

const socials = [
  { label: 'Instagram', src: '/icons/instagram.svg', href: 'https://www.instagram.com/econverse.ag/' },
  { label: 'Facebook', src: '/icons/facebook.svg', href: 'https://www.facebook.com/agenciaeconverse/' },
  { label: 'LinkedIn', src: '/icons/linkedin.svg', href: 'https://www.linkedin.com/company/econverse/' },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <section className={styles.newsletter} aria-labelledby="newsletter-title">
        <Container className={styles.newsletterInner}>
          <div className={styles.newsletterCopy}>
            <h2 id="newsletter-title" className={styles.newsletterTitle}>
              Inscreva-se na nossa newsletter
            </h2>
            <p className={styles.newsletterDescription}>
              Assine a nossa newsletter e receba as novidades e conteúdos
              exclusivos do Econverse.
            </p>
          </div>

          <form className={styles.form} action="#" method="post">
            <div className={styles.fields}>
              <div className={styles.field}>
                <label className="sr-only" htmlFor="newsletter-name">
                  Digite seu nome
                </label>
                <input
                  id="newsletter-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Digite seu nome"
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.field}>
                <label className="sr-only" htmlFor="newsletter-email">
                  Digite seu e-mail
                </label>
                <input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Digite seu e-mail"
                  className={styles.input}
                  required
                />
              </div>

              <Button type="submit" className={styles.submit}>
                INSCREVER
              </Button>
            </div>

            <label className={styles.terms}>
              <input type="checkbox" name="terms" required className={styles.checkbox} />
              <span>Aceito os termos e condições</span>
            </label>
          </form>
        </Container>
      </section>

      <div className={styles.main}>
        <Container className={styles.mainInner}>
          <div className={styles.about}>
            <img
              src="/Logo.png"
              alt="Econverse"
              width={139}
              height={42}
              className={styles.logo}
              loading="lazy"
            />
            <p className={styles.aboutText}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
            <ul className={styles.socials}>
              {socials.map(({ label, src, href }) => (
                <li key={label}>
                  <a
                    className={styles.socialLink}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src={src}
                      alt=""
                      width={24}
                      height={24}
                      className={styles.socialIcon}
                      loading="lazy"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav className={styles.links} aria-label="Institucional">
            {linkGroups.map((group) => (
              <div key={group.title} className={styles.linkGroup}>
                <h3 className={styles.groupTitle}>{group.title}</h3>
                <ul className={styles.linkList}>
                  {group.links.map((link) => (
                    <li key={link}>
                      <a href="#" className={styles.link}>
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </Container>
      </div>

      <div className={styles.bottom}>
        <Container className={styles.bottomInner}>
          <p className={styles.copyright}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </p>
        </Container>
      </div>
    </footer>
  );
}
