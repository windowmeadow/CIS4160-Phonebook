import { useEffect, useMemo, useState } from "react";
import "./App.css";
import playlistImg from "./assets/playlistimg.png";
import Contact from "./components/Contact/Contact";

const FALLBACK_CONTACTS = [
    {
        id: 1,
        name: "Grant Perez",
        phone: "(858)703-5248",
        email: "grentperez@music.com",
        photo: "/data/grentperez.png",
    },
    {
        id: 2,
        name: "Laufey Lín Bing Jónsdóttir",
        phone: "(000)423-1999",
        email: "laufey@music.com",
        photo: "/data/Laufey.png",
    },
    {
        id: 3,
        name: "Cameron Lew",
        phone: "(001)126-1995",
        email: "gingerroot@music.com",
        photo: "/data/gingerroot.jpg",
    },
    {
        id: 4,
        name: "María Zardoya",
        phone: "(001) 121-1994",
        email: "themarias@music.com",
        photo: "/data/Maria.png",
    },
    {
        id: 5,
        name: "Marco Rivero Ochoa",
        phone: "(000) 617-2017",
        email: "mustardservice@music.com",
        photo: "/data/mustardservice.jpg",
    },

    {
        id: 6,
        name: "Pierro Piccioni",
        phone: "(001) 216-1921",
        email: "pierropiccioni@music.com",
        photo: "/data/pierropiccioni.webp",
    },
    {
        id: 7,
        name: "Woodrow Yeakel",
        phone: "(000) 814-2017",
        email: "citygirlmusictime@music.com",
        photo: "/data/citygirl.jpg",
    },
    {
        id: 8,
        name: "Steven Fitzpatrick",
        phone: "(000) 407-2016",
        email: "hers@music.com",
        photo: "/data/StevenFitzpatrick.png",
    },
    {
        id: 9,
        name: "Audun Laading",
        phone: "(000) 824-2018",
        email: "hers@music.com",
        photo: "/data/AuudunLaading.png",
    },
    {
        id: 10,
        name: "Julia Bozzo",
        phone: "(000) 510-2020",
        email: "planttvibes@music.com",
        photo: "/data/planttvibes.jpg",
    },
];
{/* ADD fallback contacts 
    {FALLBACK_CONTACTS.map((contact) => {
                    console.log(contact);
                    return contact;
                })}
*/}



//button to toggle page view logic
const App = () => {
    const [pageView, setPageView] = useState(false);
    const [contacts, setContacts] = useState(FALLBACK_CONTACTS);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // index of currently shown contact in page view
    const [pageIndex, setPageIndex] = useState(0);

    // keyboard navigation (left/right/escape) while page view is open
    useEffect(() => {
        if (!pageView) return;
        const onKey = (e) => {
            if (e.key === "ArrowLeft") {
                setPageIndex((i) => (contacts.length ? (i - 1 + contacts.length) % contacts.length : 0));
            } else if (e.key === "ArrowRight") {
                setPageIndex((i) => (contacts.length ? (i + 1) % contacts.length : 0));
            } else if (e.key === "Escape") {
                setPageView(false);
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [pageView, contacts.length]);


    // for adding contacts
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
            {/*start Button Add*/}
            {/* toggle button: */}
            <button
                className="bigbtn"
                type="button"
                onClick={() => {
                    setPageIndex(0); // start at first contact when opening
                    setPageView((v) => !v);
                }}
                aria-pressed={pageView}
                data-testid="btn-toggle-pageview"
            >
                {pageView ? "Exit Page View" : "Switch to Page View"}
            </button>
            {/* Page view overlay */}
            {pageView && contacts.length > 0 && (
                <div className="page-view" role="dialog" aria-label="Page view">
                    <button
                        className="page-view__close"
                        onClick={() => setPageView(false)}
                        aria-label="Close page view"
                    >
                        ❌
                    </button>

                    <div className="page-view__card.single" key={contacts[pageIndex].id}>
                        <img
                            src={`${contacts[pageIndex].photo}`}
                            alt={contacts[pageIndex].name}
                            className="page-view__photo"
                        />
                        <div className="page-view__info">
                            <h2>{contacts[pageIndex].name}</h2>
                            <p>{contacts[pageIndex].phone}</p>
                            <p>{contacts[pageIndex].email}</p>
                        </div>

                        {/* nav moved inside the card so buttons sit at the bottom */}
                        <div className="page-view__nav" aria-hidden="false">
                            <button
                                className="page-view__nav-btn"
                                onClick={() => setPageIndex((i) => (i - 1 + contacts.length) % contacts.length)}
                                aria-label="Previous contact"
                            >
                                |←
                            </button>
                            <div className="page-view__counter">{pageIndex + 1} / {contacts.length}</div>
                            <button
                                className="page-view__nav-btn"
                                onClick={() => setPageIndex((i) => (i + 1) % contacts.length)}
                                aria-label="Next contact"
                            >
                                →|
                            </button>
                        </div>
                    </div>
                </div>
            )}
    {/*End Button Add*/}
    

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
                <h2 id="contacts-heading">Contacts:</h2>

                <div
                    className="contacts__header"
                    id="contacts-subheading"
                >   
                    {/* column headers */}
                    <span className="col">Photo</span>   
                    <span className="col">Name</span>
                    <span className="col">Number</span>
                    <span className="col">Email</span>
                </div>
            </section>

        
                <div className="contacts__grid">
                    {FALLBACK_CONTACTS.map((contact) => {
                        return (
                            <Contact
                                key={contact.id}
                                email={contact.email}
                                phone={contact.phone}
                                name={contact.name}
                                photo={contact.photo}
                            />
                        );
                    })}
                </div> 

            
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
