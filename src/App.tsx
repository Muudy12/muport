import "./App.scss";
import PageHelmet from "./helmet/helmet";
import muPortLogo from "./assets/logos/muport-logo-rbg.png";
import mudah from "./assets/images/mudah.png";
import bannerBg from "./assets/images/banner-bg.jpg";
import { useEffect, useState } from "react";
import dataPath from "./data/data.json?url";
import emailjs from "@emailjs/browser";
import bg1 from "./assets/images/bg-1.jpg";
import { BsLayoutTextSidebar } from "react-icons/bs";
import {
  FaArrowAltCircleUp,
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight,
} from "react-icons/fa";

function App() {
  return (
    <>
      <PageHelmet
        content={"Web portfolio for Mu Dah - Software Engineer, Web Developer"}
        href={window.location.href}
      />
      <MainBody />
    </>
  );
}

function MainBody() {
  const [showSideMenu, setShowSideMenu] = useState(false);
  return (
    <>
      <div id="top" className={`main`}>
        <div className="up-arrow__container">
          <FaArrowAltCircleUp
            className="up-arrow"
            onClick={() => (window.location.hash = "top")}
          />
        </div>
        <header className={`sideMenu ${showSideMenu ? "show" : "hide"}`}>
          <BsLayoutTextSidebar
            className="sideBarLogo"
            onClick={() => setShowSideMenu(!showSideMenu)}
          />
          <div
            className="sideBarContent"
            style={{ display: showSideMenu ? "flex" : "none" }}
          >
            <div className="logo__container">
              <img className="logo" src={muPortLogo} alt="Mu Port Logo" />
            </div>
            <ul className="nav">
              <li
                onClick={() => {
                  setShowSideMenu(false);
                  window.location.hash = "projects";
                }}
              >
                projects
              </li>
              <li
                onClick={() => {
                  setShowSideMenu(false);
                  window.location.hash = "about";
                }}
              >
                about
              </li>
            </ul>
            <h2
              className="get-connected"
              data-label="get connected"
              onClick={() => {
                setShowSideMenu(false);
                window.location.hash = "connect";
              }}
            >
              get connected
            </h2>
          </div>
        </header>
        <header className={`topMenu`}>
          <div className="logo__container">
            <img className="logo" src={muPortLogo} alt="Mu Port Logo" />
          </div>
          <ul className="nav">
            <li onClick={() => (window.location.hash = "projects")}>
              projects
            </li>
            <li onClick={() => (window.location.hash = "about")}>about</li>
          </ul>
          <h2
            className="get-connected"
            data-label="get connected"
            onClick={() => (window.location.hash = "connect")}
          >
            get connected
          </h2>
        </header>
        <div
          className={`body-content ${
            showSideMenu ? "menuOpened" : "menuClosed"
          }`}
        >
          <section className="banner">
            <div
              className="bannerBg"
              style={{ backgroundImage: `url(${bannerBg})` }}
            ></div>
            <figure className="image">
              <img src={mudah} alt="Mu Dah Headshot photo" />
            </figure>
            <div className="details">
              <h2 className="header">
                Hello, I'm <span className="name">Mu Dah</span>
                <span className="role">Web Developer</span>
              </h2>
              <p>
                I love to experiment with ideas and bring them to live through
                web development.
              </p>
              <p>
                You can check out my{" "}
                <a href="https://github.com/Muudy12">GitHub</a> for more sneak
                peak on what I've been working on. And feel free to{" "}
                <span onClick={() => (window.location.hash = "about")}>
                  contact
                </span>{" "}
                me for opportunities, idea sharing and collaboration.
              </p>
            </div>
          </section>

          <section id="projects" className="projects__container">
            <h2 className="title">Projects</h2>
            <ProjectCardS />
          </section>

          <section id="about" className="about__container">
            <h2 className="title">About Me</h2>
            <AboutContent />
          </section>

          <section id="connect" className="connect">
            <div
              className="overlay"
              style={{ backgroundImage: `url(${bg1})` }}
            ></div>
            <h2 className="title">Connect with me on</h2>
            <EmailForm />
          </section>
        </div>
      </div>
    </>
  );
}

interface IProjectCard {
  title: string;
  image: string;
  url: string;
  repo: string;
}

function ProjectCardS() {
  const [projects, setProjects] = useState<IProjectCard[] | null>(null);
  const [currentScrollCount, setCurrentScrollCount] = useState<number>(0);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(dataPath);
        if (!response.ok) {
          console.error("Failed to get response...");
        }
        const data = await response.json(); // parse the json response
        const allProjects: IProjectCard[] = data.projects; // access the logos array from the json
        setProjects(allProjects);
      } catch (er) {
        console.error("Failed to fetch data...");
      }
    };

    fetchProjects();
  }, []);

  const scroll = (direction: "left" | "right") => {
      if (projects) {
        let nextCount: number = 0;

        if (direction === "left") {
          nextCount = currentScrollCount - 1;

          if (nextCount < 0) {
            setCurrentScrollCount(0);
          } else {
            setCurrentScrollCount(nextCount);
            handleLeftClick(nextCount);
          }
        } else {
          nextCount = currentScrollCount + 1;
          
          if (nextCount > projects.length - 1) {
            setCurrentScrollCount(projects.length - 1);
          } else {
            setCurrentScrollCount(nextCount);
            handleRightClick(nextCount);
          }
        }
      }
  };

  const changeCard = (card: IProjectCard | null, projCard: HTMLLIElement) => {
    if (card) {
      setTimeout(() => {
        const h3 = projCard.querySelector("h3");
        if (h3) h3.textContent = card.title;
        const img = projCard.querySelector("img");
        if (img) {
          img.src = card.image;
          img.alt = card.title + " Project Thumbnail";
        }
        const btn1 = projCard.querySelectorAll("button")[0];
        if (btn1)
          btn1.onclick = () => {
            window.open(card.url);
          };
        const btn2 = projCard.querySelectorAll("button")[1];
        if (btn2)
          btn2.onclick = () => {
            window.open(card.repo);
          };
      }, 225); // delay by 225 milliseconds
    }
  };

  function handleLeftClick(nextCount: number) {
    const projCard = document.querySelector("#projCard") as HTMLLIElement;
    if (projCard) {
      // Add the animation class
      projCard.classList.add("slide-left");

      // Remove the animation class after it ends to allow replay
      const onAnimationEnd = () => {
        if (projCard) {
          projCard.classList.remove("slide-left");
          projCard.removeEventListener("animationend", onAnimationEnd);
        }
      };
      const card = projects ? projects[nextCount] : null;
      changeCard(card, projCard);

      projCard.addEventListener("animationend", onAnimationEnd);
    }
  }

  function handleRightClick(nextCount: number) {
    const projCard = document.querySelector("#projCard") as HTMLLIElement;
    if (projCard) {
      // Add the animation class
      projCard.classList.add("slide-right");

      // Remove the animation class after it ends to allow replay
      const onAnimationEnd = () => {
        if (projCard) {
          projCard.classList.remove("slide-right");
          projCard.removeEventListener("animationend", onAnimationEnd);
        }
      };

      const card = projects ? projects[nextCount] : null;
      changeCard(card, projCard);

      projCard.addEventListener("animationend", onAnimationEnd);
    }
  }

  return (
    <>
      <div className="projects__scroll-container">
        {/* Scrollable Container */}
        <ul className="projects scroll-list">
          {projects && (
            <li id="projCard" className="card">
              <h3 className="header">{projects[0].title}</h3>
              <img
                src={projects[0].image}
                alt={`${projects[0].title} Project Thumbnail`}
              />
              <div className="btn-container">
                <button
                  className="btn"
                  onClick={() => window.open(projects[0].url)}
                >
                  Visit
                </button>
                <button
                  className="btn"
                  onClick={() => window.open(projects[0].repo)}
                >
                  Repo
                </button>
              </div>
            </li>
          )}
        </ul>

        <div className="btn__container">
          <FaArrowAltCircleLeft
            className="btn leftward"
            onClick={() => scroll("left")}
          />
          <FaArrowAltCircleRight
            className="btn rightward"
            onClick={() => scroll("right")}
          />
        </div>
      </div>
      <ul className="projects non-scroll">
        {projects?.map((p, index) => {
          return (
            <>
              <li className="card" key={index}>
                <h3 className="header">{p.title}</h3>
                <img src={p.image} alt={`${p.title} Project Thumbnail`} />
                <div className="btn-container">
                  <button className="btn" onClick={() => window.open(p.url)}>
                    Visit
                  </button>
                  <button className="btn" onClick={() => window.open(p.repo)}>
                    Repo
                  </button>
                </div>
              </li>
            </>
          );
        })}
      </ul>
    </>
  );
}

function AboutContent() {
  const [skills, setSkills] = useState<string[] | null>([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch(dataPath);
        if (!response.ok) {
          console.error("Failed to get response...");
        }
        const data = await response.json(); // parse the json response
        const logoPaths: string[] = data.logos; // access the logos array from the json
        setSkills(logoPaths);
      } catch (er) {
        console.error("Failed to fetch data...");
      }
    };

    fetchSkills();
  }, []);
  return (
    <>
      <div className="about">
        <div className="card">
          <h3 className="header">Background</h3>
          <p className="text">
            <span>
              My journey began in customer service, where I honed my ability to
              connect with people and thrive in collaborative environments.
              Through these experiences, I discovered my passion for
              problem-solving and exploring new challenges. This curiosity led
              me to web development, where I found immense joy in transforming
              ideas into functional and visually appealing applications.
            </span>
            <span>
              I embrace continuous learning, eagerly acquiring new skills and
              applying them to real-world projects. Whether it’s crafting
              user-centric designs or building dynamic web applications, I’m
              dedicated to creating impactful solutions that merge creativity
              and functionality. Let's collaborate and bring great ideas to
              life!
            </span>
          </p>
        </div>
        <div className="card">
          <h3 className="header">Development Skills</h3>
          <p className="text skills">
            {skills?.map((s, index) => {
              return <img className="skill" key={index} src={s} alt="" />;
            })}
          </p>
        </div>
      </div>
    </>
  );
}

interface ISocialsCard {
  title: string;
  url: string;
  logo: string;
}
function EmailForm() {
  const [socials, setSocials] = useState<ISocialsCard[] | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    const fetchSocials = async () => {
      try {
        const response = await fetch(dataPath);
        if (!response.ok) {
          console.error("Failed to get response...");
        }
        const data = await response.json(); // parse the json response
        const socialData: ISocialsCard[] = data.socials; // access the logos array from the json
        setSocials(socialData);
      } catch (er) {
        console.error("Failed to fetch data...");
      }
    };

    fetchSocials();
  }, []);

  function isValidEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z0-9]+$/;
    return emailRegex.test(email);
  }

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = form.elements.namedItem("user_name") as HTMLInputElement;
    const email = form.elements.namedItem("user_email") as HTMLInputElement;
    const message = form.elements.namedItem("message") as HTMLInputElement;

    if (
      name.value &&
      email.value &&
      isValidEmail(email.value) &&
      message.value
    ) {
      emailjs
        .sendForm(
          import.meta.env.VITE_EMAIL_SERVICEKEY,
          import.meta.env.VITE_EMAIL_TEMPLATEKEY,
          e.currentTarget,
          {
            publicKey: import.meta.env.VITE_EMAIL_PUBLICKEY,
          }
        )
        .then(
          () => {
            name.value = "";
            email.value = "";
            message.value = "";
            setMessage("Message successfully sent!");
            setSuccess(true);
          },
          () => {
            setMessage("Message failed to send...");
            setSuccess(false);
          }
        );
    }
  };

  return (
    <>
      <div className="socials">
        {socials?.map((s, index) => {
          return (
            <div
              className="social"
              key={index}
              onClick={() => window.open(s.url)}
            >
              <img className={s.title} src={s.logo} alt={`${s.title} Logo`} />
            </div>
          );
        })}
      </div>

      <form onSubmit={sendEmail} className="form">
        <h2 className="title">Comments and feedbacks are welcomed!</h2>
        <label>Name</label>
        <input type="text" name="user_name" required />
        <label>Email</label>
        <input type="email" name="user_email" required />
        <label>Message</label>
        <textarea typeof="string" name="message" required />
        <button type="submit">Send</button>
        <p
          className={`message ${success ? "success" : "fail"}`}
          style={{ display: message !== null ? "flex" : "none" }}
        >
          {message}
        </p>
      </form>
    </>
  );
}
export default App;
