import { MdEmail } from "react-icons/md";
import { IoLogoWhatsapp } from "react-icons/io";
import { IoLogoTiktok } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Footer from "../../Layout/Footer";
const Card = ({ icon, title, link }) => {
  return (
    <div className="h-[50vh] bg-white rounded-xl border border-black ">
      <div className="h-[46%] w-full border-b border-black flex justify-center items-center">
        {icon && icon}
      </div>
      <div className="w-full flex justify-center flex-col  items-center text-[1.5rem]">
        <h2>{title}</h2>
        <a
          href={link}
          className="hover:opacity-50 transtion duration-200 mt-[7vh] text-center bg-purple-500  rounded-3xl xl:w-[14vw] w-[40vw] text-white"
        >
          Visit
        </a>
      </div>
    </div>
  );
};

const ContactPage = () => {
  const navigate = useNavigate();
  const cardsData = {
    icons: [
      <IoLogoTiktok className="w-[100%] h-[30%]" />,
      <FaInstagram className="w-[100%] h-[30%]" />,
    ],
    titles: ["Our TikTok", "Our Instagram"],
    alt: ["tiktokIcon", "instagramIcon"],
    socialsLinks: [
      "https://www.tiktok.com/@dyxtcompany",
      "https://www.instagram.com/dyxtcompany/",
    ],
  };
  return (
    <div className="w-full min-h-[100vh]">
      <header className="w-full bg-purple-500 h-[48vh] flex  justify-between  ">
        <div className="flex flex-col items-start   pl-[5vw] gap-5">
          <h1 className="text-[3.6rem] mt-[7vh] w-full text-white">
            Contact Us
          </h1>
          <ul>
            <li className="flex gap-[1vw] items-center">
              <IoLogoWhatsapp />
              Whatsapp-<a href=" https://wa.me/+9722327557">+9722327557</a>
            </li>
            <li className="flex gap-[1vw] items-center">
              <MdEmail />
              Gmail-<a href="mailto:dyxtorg@gmail.com">dyxtorg@gmail.com</a>
            </li>
          </ul>
        </div>
        <div className="h-full flex  items-end p-[5vh] w-full justify-end">
          <button
            onClick={() => {
              navigate("/register");
            }}
            className="
            hover:bg-purple-800 hover:text-white transition-ease-in-out duration-400
            bg-white text-[1.2rem] rounded-3xl min-w-[20vw] h-[20%]"
          >
            Join us
          </button>
        </div>
      </header>
      <h2 className="w-full text-white text-center text-[3rem] mt-[7vh] ">
        Social Medias
      </h2>
      <div className="grid md:grid-cols-2 grid-cols-1 p-[4vw] gap-[6vw]">
        {cardsData.icons.map((icon, i) => (
          <Card
            icon={icon}
            title={cardsData.titles[i]}
            link={cardsData.socialsLinks[i]}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
