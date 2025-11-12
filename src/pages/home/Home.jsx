import React, { useState, useRef } from "react";
import "../../css/Home.css";
import Logo from "../../componetes/Logo";
import Send from "../../componetes/Send";
import { 
  FaImage, FaRegHeart, FaShare, FaRegBookmark, 
  FaRegCommentDots, FaBell, FaBars, FaSearch, 
  FaChevronLeft, FaChevronRight 
} from 'react-icons/fa';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const [currentDate, setCurrentDate] = useState(new Date());
  const today = new Date();

  const getCalendarDays = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDay = firstDay.getDay();

    const prevMonthLastDay = new Date(year, month, 0).getDate();
    const prevDays = Array.from({ length: startDay }, (_, i) => ({
      day: prevMonthLastDay - startDay + i + 1,
      current: false
    }));

    const currentDays = Array.from({ length: daysInMonth }, (_, i) => ({
      day: i + 1,
      current: true
    }));

    const totalCells = 42;
    const nextDaysCount = totalCells - (prevDays.length + currentDays.length);
    const nextDays = Array.from({ length: nextDaysCount }, (_, i) => ({
      day: i + 1,
      current: false
    }));

    return [...prevDays, ...currentDays, ...nextDays];
  };

  const handleAttachClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => setImagePreview(event.target.result);
    reader.readAsDataURL(file);
  };

  const handleSend = () => {
    if (inputValue.trim() === "" && !imagePreview) return;

    const newPost = {
      id: Date.now(),
      text: inputValue,
      image: imagePreview,
      date: new Date().toLocaleString()
    };

    setPosts((prev) => [newPost, ...prev]);
    setInputValue("");
    setImagePreview(null);
  };

  return (
    <div className="home-container no-scroll">
      {/* ===== COLUNA ESQUERDA ===== */}
      <aside className="left-sidebar">
        <div className="logo-header">
          <Logo color="black" size={22} />
          <span translate="no">GrowUs</span>
        </div>

        <div className="widget">
          <h3>Sugeridos</h3>
          <ul className="suggested-list">
            {[...Array(4)].map((_, i) => (
              <li key={i}>
                <div className="avatar-placeholder"></div>
                <div className="text-placeholder">
                  <div className="line-short"></div>
                  <div className="line-long"></div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="widget">
          <h3>Emblemas</h3>
          <div className="emblems-grid">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="emblem-placeholder"></div>
            ))}
          </div>
        </div>
      </aside>

      {/* ===== COLUNA CENTRAL ===== */}
      <div className="center-column">
        <div className="top-bar card">
          <div className="chat-input-area">
            <button className="attach-btn" onClick={handleAttachClick}>
              <FaImage color="black" size={22} />
            </button>

            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleFileChange}
            />

            <input
              type="text"
              placeholder="Compartilhe algo novo..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />

            <button className="send-btn" onClick={handleSend}>
              <Send color="black" size={22} />
            </button>
          </div>

          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Prévia" />
              <button className="remove-img" onClick={() => setImagePreview(null)}>×</button>
            </div>
          )}
        </div>

        <main className="main-feed scrollable">
          {posts.length === 0 ? (
            <p className="no-posts">Nenhum post ainda...</p>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="feed-post card">
                <div className="post-header">
                  <div className="avatar-placeholder"></div>
                  <div className="text-placeholder">
                    <div className="line-short"></div>
                    <div className="line-long"></div>
                  </div>
                </div>

                <div className="post-content">
                  {post.text && <p>{post.text}</p>}
                  {post.image && <img src={post.image} alt="Post" className="post-img" />}
                  <span className="post-date">{post.date}</span>
                </div>

                <div className="post-actions">
                  <FaRegHeart className="icon" />
                  <FaShare className="icon" />
                  <FaRegBookmark className="icon icon-right" />
                </div>
              </div>
            ))
          )}
        </main>
      </div>

      {/* ===== COLUNA DIREITA ===== */}
      <aside className="right-sidebar">
        <header className="right-header">
          <FaRegCommentDots className="icon" />
          <FaBell className="icon" />
          <FaBars className="icon" />
        </header>

        <div className="search-bar">
          <FaSearch className="icon-search" />
          <input type="text" placeholder="Buscar" />
        </div>

        <div className="widget card">
          <h3>Calendário</h3>
          <div className="calendar-header">
            <FaChevronLeft
              className="nav-arrow"
              onClick={() =>
                setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
              }
            />
            <span className="month-label">
              {currentDate.toLocaleString("pt-BR", { month: "long", year: "numeric" })}
            </span>
            <FaChevronRight
              className="nav-arrow"
              onClick={() =>
                setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
              }
            />
          </div>

          <div className="calendar-grid">
            {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"].map((d) => (
              <div key={d} className="cal-header">{d}</div>
            ))}

            {getCalendarDays(currentDate).map((d, i) => {
              const isToday =
                d.current &&
                d.day === today.getDate() &&
                currentDate.getMonth() === today.getMonth() &&
                currentDate.getFullYear() === today.getFullYear();

              return (
                <div
                  key={i}
                  className={`cal-day ${d.current ? "current-month" : "other-month"} ${
                    isToday ? "today" : ""
                  }`}
                >
                  {d.day}
                </div>
              );
            })}
          </div>
        </div>

        <div className="widget card">
          <h3>Eventos Próximos</h3>
          <div className="event-item">
            <div className="line-short"></div>
            <div className="line-long"></div>
            <div className="line-long"></div>
          </div>
          <div className="event-nav">
            <FaChevronLeft className="nav-arrow" />
            <span className="nav-dot active"></span>
            <span className="nav-dot"></span>
            <span className="nav-dot"></span>
            <FaChevronRight className="nav-arrow" />
          </div>
        </div>
      </aside>
    </div>
  );
}
