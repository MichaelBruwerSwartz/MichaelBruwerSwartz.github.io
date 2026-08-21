import data from './data/portfolio.json';

const { personal, research, interests, projects, earlier, education, awards, skills } = data;

function Entry({ title, meta, metaHref, tech, logo, children }) {
  return (
    <div className={logo ? 'entry entry-logo-row' : 'entry'}>
      {logo && <img className="entry-logo" src={logo} alt="" aria-hidden="true" />}
      <div className="entry-body">
        <div className="entry-head">
          <span className="entry-title">{title}</span>
          {meta && (
            <span className="entry-meta">
              {metaHref
                ? <a href={metaHref} target="_blank" rel="noopener noreferrer">{meta}</a>
                : meta}
            </span>
          )}
        </div>
        {children && <p>{children}</p>}
        {tech && <div className="tech">{tech.join(' · ')}</div>}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <main>
      <header className="intro">
        <h1>{personal.name}</h1>
        <p className="role">{personal.role} · {personal.location}</p>
        {personal.bio.map((para, i) => <p className="bio" key={i}>{para}</p>)}
      </header>

      <section>
        <h2>Research</h2>
        {research.map(r => (
          <Entry key={r.id} title={r.title} meta={r.meta} tech={r.tech}>
            {r.description}
          </Entry>
        ))}
      </section>

      <section>
        <h2>Interests</h2>
        <p className="skills-list">{interests.join(' · ')}</p>
      </section>

      <section>
        <h2>Projects</h2>
        {projects.map(p => (
          <Entry key={p.id} title={p.title} meta={p.meta} metaHref={p.metaHref} tech={p.tech}>
            {p.description}
          </Entry>
        ))}
        <p className="earlier">{earlier}</p>
      </section>

      <section>
        <h2>Education</h2>
        {education.map(e => (
          <Entry key={e.id} title={e.degree} meta={e.year} logo={e.logo}>{e.institution}</Entry>
        ))}
      </section>

      <section>
        <h2>Awards</h2>
        {awards.map((a, i) => (
          <Entry key={i} title={a.title} meta={a.year}>{a.institution}</Entry>
        ))}
      </section>

      <section>
        <h2>Skills</h2>
        {Object.entries(skills).map(([group, items]) => (
          <div className="entry" key={group}>
            <div className="entry-title">{group}</div>
            <p>{items.join(' · ')}</p>
          </div>
        ))}
      </section>

      <section className="contact">
        <h2>Contact</h2>
        <ul>
          <li><a href={`mailto:${personal.email}`}>{personal.email}</a></li>
          <li>
            <a href={`https://github.com/${personal.github}`} target="_blank" rel="noopener noreferrer">
              github.com/{personal.github}
            </a>
          </li>
        </ul>
      </section>
    </main>
  );
}
