import { useEffect, useMemo, useState } from "react";
import "./App.css";
import playlistImg from "./assets/playlistimg.png";

const FALLBACK_CONTACTS = [
    {
        id: 1,
        name: "Grant Perez",
        phone: "(858)703-5248",
        email: "grentperez@music.com",
    },
    {
        id: 2,
        name: "Laufey Lín Bing Jónsdóttir",
        phone: "(000)423-1999",
        email: "laufey@music.com",
    },
    {
        id: 3,
        name: "Cameron Lew",
        phone: "(001)126-1995",
        email: "gingerroot@music.com",
    },
    {
        id: 4,
        name: "María Zardoya",
        phone: "(001) 121-1994",
        email: "themarias@music.com",
    },
    {
        id: 5,
        name: "Marco Rivero Ochoa",
        phone: "(000) 617-2017",
        email: "mustardservice@music.com",
    },

    {
        id: 6,
        name: "Pierro Piccioni",
        phone: "(001) 216-1921",
        email: "pierropiccioni@music.com",
    },
    {
        id: 7,
        name: "Woodrow Yeakel",
        phone: "(000) 814-2017",
        email: "citygirlmusictime@music.com",
    },
    {
        id: 8,
        name: "Steven Fitzpatrick",
        phone: "(000) 407-2016",
        email: "hers@music.com",
    },
    {
        id: 9,
        name: "Audun Laading",
        phone: "(000) 824-2018",
        email: "hers@music.com",
    },
    {
        id: 10,
        name: "Julia Bozzo",
        phone: "(000) 510-2020",
        email: "planttvibes@music.com",
    },
];

const App = () => {
    const [contacts, setContacts] = useState(FALLBACK_CONTACTS);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {}, []);

    const [query, setQuery] = useState("");

    const [form, setForm] = useState({ name: "", phone: "", email: "" });
    function handleSubmit(e) {
        e.preventDefault();
        // Add contact submission logic here
    }
    return (
        <main className="page" data-testid="page-root">
            <div className="playlist_img">
                <img
                    src={playlistImg}
                    className="playlist_img"
                    alt="image of an alaskan mountain on a cloudy day"
                    width="222"
                    height="222"
                />
                <header className="page__header">
                    <h1 className="page__title">Isaiah's Music Taste Phonebook </h1>
                    <p className="page__subtitle">
                        No need to say it, I know my taste is goated.
                    </p>
                    <p className="search__results" data-testid="results-count">
                        By Isaiah • {contacts.length}{" "}
                        {contacts.length === 1 ? "result" : "contacts"}
                        {loading ? " (loading...)" : ""}
                        {error ? ` (error: ${error})` : ""}
                    </p>
                </header>
            </div>

            <section className="search" aria-labelledby="search-heading">
                <button className="btn" type="submit" data-testid="btn-add" color="#39d353">
                    Search Contacts
                </button>
                <div className="search__controls">
                    <input
                        id="search-input"
                        type="search"
                        placeholder="Search by name or phone"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        data-testid="search-input"
                    />
                </div>

                <p className="search__results" data-testid="results-count">
                    Showing {contacts.length}{" "}
                    {contacts.length === 1 ? "result" : "results"}
                    {loading ? " (loading...)" : ""}
                    {error ? ` (error: ${error})` : ""}
                </p>
            </section>

            <section className="contacts" aria-labelledby="contacts-heading">
                <h2 id="contacts-heading">Contacts</h2>
                <div
                    className="contacts__header"
                    id="contacts-subheading"
                >
                    {/* column headers */}

                    <span className="col">Name</span>
                    <span className="col">Number</span>
                    <span className="col">Email</span>
                </div>


                {/* actual items in columns */}
                <ul id="contacts-list">
                    {FALLBACK_CONTACTS.map((item) => (
                        <li key={item.id}>

                            <span className="col">{item.name}</span>
                            <span className="col">{item.phone}</span>
                            <span className="col">{item.email}</span>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="form" aria-labelledby="form-heading">
                <h2 id="form-heading">Add an Artist</h2>
                <form className="form__body" onSubmit={handleSubmit} noValidate>
                    <div className="field">
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            required
                            minLength={2}
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="phone">Phone</label>
                        <input
                            id="phone"
                            name="phone"
                            inputMode="tel"
                            placeholder="(xxx) xxx-xxxx"
                            value={form.phone}
                            onChange={(e) =>
                                setForm({ ...form, phone: e.target.value })
                            }
                            required
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="@music.com"
                            value={form.email}
                            onChange={(e) =>
                                setForm({ ...form, email: e.target.value })
                            }
                        />
                    </div>
                    <div className="form__actions">
                        <button className="btn" type="submit" data-testid="btn-add"color="#39d353">
                            Add Artist
                        </button>
                    </div>
                </form>
            </section>

            <footer className="page__footer">
                <small>this is it. you can scroll back to the top now. 🙂</small>
            </footer>
        </main>
    );
};

export default App;
