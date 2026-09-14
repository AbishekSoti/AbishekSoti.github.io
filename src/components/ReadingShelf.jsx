import { ArrowUpRight } from "lucide-react";
import { currentlyReading, sherlockVolumes } from "../data/reading.js";

export function ReadingShelf() {
  return (
    <section
      className="section-band reading-band"
      id="reading-shelf"
      aria-labelledby="reading-heading"
    >
      <div className="section-inner reading-layout">
        <div className="reading-copy">
          <header>
            <p className="eyebrow">Now reading</p>
            <h2 id="reading-heading">On the shelf.</h2>
            <p>
              Technical depth beside fiction built on observation, deduction and
              disciplined thinking.
            </p>
          </header>

          <div className="reading-notes">
            {currentlyReading.map((book, index) => (
              <a href={book.href} target="_blank" rel="noreferrer" key={book.id}>
                <span className="reading-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="reading-note-copy">
                  <strong>{book.title}</strong>
                  <span>{book.author}</span>
                  <span className="reading-detail">{book.detail}</span>
                  <span className="reading-note">{book.note}</span>
                </span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <div className="bookcase" aria-label="Current reading bookshelf">
          <div className="bookshelf">
            <div className="bookshelf-label">
              <span>Current volumes</span>
              <span>02 books</span>
            </div>
            <div className="bookshelf-current">
              <a
                className="book-cover book-cover-cpp"
                href={currentlyReading[1].href}
                target="_blank"
                rel="noreferrer"
                aria-label="A Tour of C++, Third Edition by Bjarne Stroustrup"
              >
                <span>Modern C++</span>
                <strong>A Tour of C++</strong>
                <small>Bjarne Stroustrup</small>
              </a>
              <a
                className="book-cover book-cover-holmes"
                href={currentlyReading[0].href}
                target="_blank"
                rel="noreferrer"
                aria-label="The complete Sherlock Holmes canon by Sir Arthur Conan Doyle"
              >
                <span>The complete canon</span>
                <strong>Sherlock Holmes</strong>
                <small>Arthur Conan Doyle</small>
              </a>
            </div>
            <div className="bookshelf-plank" aria-hidden="true" />
          </div>

          <div className="bookshelf bookshelf-canon">
            <div className="bookshelf-label">
              <span>The Holmes canon</span>
              <span>4 novels · 56 stories</span>
            </div>
            <ol className="sherlock-volumes">
              {sherlockVolumes.map((volume, index) => (
                <li
                  className={`book-spine book-spine-${volume.tone}`}
                  title={volume.title}
                  key={volume.title}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{volume.shortTitle}</strong>
                  <small>A. C. Doyle</small>
                </li>
              ))}
            </ol>
            <div className="bookshelf-plank" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
