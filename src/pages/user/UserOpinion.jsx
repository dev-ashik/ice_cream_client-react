import React, { useRef, useState } from "react";
import Layout from "../../components/Layout/Layout";
import "./UserStyles.css";
import { useAuth } from "../../context/auth";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import MenuOfUsers from "../../components/Layout/MenuOfUsers";

const negativeWords = [
  "unsatisfying",
  "runny",
  "melted",
  "freezer burned",
  "lumpy",
  "stale",
  "artificial",
  "bland",
  "freezer burnt",
  "rancid",
  "sour",
  "gritty",
  "expired",
  "watery",
  "too sweet",
  "too cold",
  "too salty",
  "overpriced",
  "unclean premises",
  "long wait times",
  "bad service",
  "icy",
  " grainy",
  "dislike",
  "disappointing",
  "strange",
  "frustrated",
  "refund",
  "fix",
  "not good",
  "Terrible",
  "Terrible",
  "Awful",
  "Horrible",
  "Disgusting",
  "Unacceptable",
  "Offensive",
  "Irritating",
  "Inconvenient",
  "Poor",
  "Slow",
  "Frustrating",
  "Complicated",
  "Confusing",
  "Unreliable",
  "Broken",
  "Useless",
  "Expensive",
  "Rip-off",
  "Scam",
  "Fraudulent",
];

const UserOpinion = () => {
  const form = useRef();
  const [mailSend, setMailSend] = useState(false);

  const [loading, setLoading] = useState(false);
  const [isFormSubmitted, setIsFormSubmited] = useState(false);
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState(auth.user.name);
  const [email, setEmail] = useState(auth.user.email);
  const [message, setMessage] = useState("");
  const [containsNegativeWord, setContainsNegativeWord] = useState(false);
  const [negativeWordCount, setNegativeWordCount] = useState(0);

  if (isFormSubmitted) {
    setTimeout(() => {
      setIsFormSubmited(false);
    }, 5000);
  }

  const textchange = (e) => {
    setMessage(e.target.value);
  };

  const sendMail = (e) => {
    e.preventDefault();

    if (e.target.name.value === "") {
      toast.warn("Name field can't be empty...!");
      return;
    }
    if (e.target.email.value === "") {
      toast.warn("Email field can't be empty...!");
      return;
    }
    if (e.target.message.value === "") {
      toast.warn("Message field can't be empty...!");
      return;
    }

    setLoading(true);
    const result = negativeWords.some((word) =>
      message.toLowerCase().includes(word)
    );
    setContainsNegativeWord(result);
    // console.log(result);

    emailjs
      .sendForm(
        "service_ccjpkou",
        "template_yek0jyg",
        form.current,
        "vFzUPBAjHlhoCt6GD"
      )
      .then(
        (result) => {
          if (result) {
            // console.log("Complaint detected!");
            setNegativeWordCount(negativeWordCount + 1);
            // negativeWordCount + 1 > 1 && toast.success("sorry again.")
          } else {
            // console.log("Feedback received!");
            toast.success(
              "Email successfully send. \n Thank you for getting in touch!"
            );
          }
          setMessage("");
          setLoading(false);
        },
        (error) => {
          toast.error("Error! please try again.");
          setLoading(false);
        }
      );
  };

  const close_apologize_window = () => {
    setContainsNegativeWord(false);
  };
  return (
    <Layout className="">
      <div className="container-fluid p-3 userOpinion_page">
        <div className="row w-100">
          <div className="col-md-3">
            <MenuOfUsers />
          </div>
          <div className="col-md-9">
            <div className="">
              {containsNegativeWord && negativeWordCount === 1 && (
                <div
                  className="apologize_window"
                  onClick={close_apologize_window}
                >
                  <div className="apologize_window-content">
                    <button
                      className="apologize_window-close"
                      onClick={close_apologize_window}
                    >
                      x
                    </button>
                    <p>
                      We are apologize for the inconvenience caused by the
                      issue. We'll work to fix it as soon as possible, and if
                      there's anything else We can do to help, please don't
                      hesitate to let us know.
                    </p>
                  </div>
                </div>
              )}

              {/* {containsNegativeWord && negativeWordCount > 1 && (
          toast.success("again Sorry for that!")
        )} */}

              <div className="contact_form">
                <form onSubmit={sendMail} ref={form}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Write you Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    type="text"
                    name="email"
                    placeholder="Write you Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <textarea
                    name="message"
                    id=""
                    cols="30"
                    rows="10"
                    placeholder="Write your message"
                    value={message}
                    onChange={textchange}
                  ></textarea>
                  <button className="button_primary" type="submit">
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserOpinion;
