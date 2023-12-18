import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVideosByUser, markVideoAsWatched, unmarkVideoAsWatched } from '../../../../store/actions/authActions';
import ReactPlayer from 'react-player';
import '../Videos/Videos.css';

const Videos = () => {
  const dispatch = useDispatch();
  const videosData = useSelector((state) => state.auth.videos);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [watchedVideos, setWatchedVideos] = useState({});
  const [accordionState, setAccordionState] = useState({});

  useEffect(() => {
    dispatch(fetchVideosByUser());
  }, [dispatch]);

  useEffect(() => {
    if (videosData && videosData.length > 0) {
      const newWatchedVideos = {};
      videosData.forEach(section => {
        if (section.videos) {
          section.videos.forEach(video => {
            newWatchedVideos[video.video_id] = video.is_watched === 1;
          });
        }
      });
      setWatchedVideos(newWatchedVideos);
    }
  }, [videosData]);

  useEffect(() => {
    if (!selectedVideo && videosData && videosData.length > 0 && videosData[0].videos && videosData[0].videos.length > 0) {
      const firstVideo = videosData[0].videos[0];
      setSelectedVideo(firstVideo);
    }
  }, [videosData, selectedVideo]);

  const toggleWatchedStatus = (videoId) => {
    const isWatched = watchedVideos[videoId];
    if (isWatched) {
      dispatch(unmarkVideoAsWatched(videoId));
    } else {
      dispatch(markVideoAsWatched(videoId));
    }
    setWatchedVideos((prevState) => ({
      ...prevState,
      [videoId]: !isWatched,
    }));
  };

  const handleMarkAsWatchedAndNext = () => {
    if (!selectedVideo || !videosData) return;

    const currentSectionIndex = videosData.findIndex((section) =>
      section.videos && section.videos.some((video) => video.video_id === selectedVideo.video_id)
    );

    if (currentSectionIndex === -1) return;

    const currentSection = videosData[currentSectionIndex];
    const currentIndex = currentSection.videos.findIndex((video) => video.video_id === selectedVideo.video_id);

    let nextVideo;
    if (currentIndex < currentSection.videos.length - 1) {
      nextVideo = currentSection.videos[currentIndex + 1];
    } else {
      const nextSectionIndex = (currentSectionIndex + 1) % videosData.length;
      for (let i = nextSectionIndex; i !== currentSectionIndex; i = (i + 1) % videosData.length) {
        if (videosData[i].videos && videosData[i].videos.length > 0) {
          nextVideo = videosData[i].videos[0];
          break;
        }
      }
    }

    if (nextVideo) {
      toggleWatchedStatus(selectedVideo.video_id);
      setSelectedVideo(nextVideo);
      setAccordionState((prevState) => ({
        ...prevState,
        [currentSection.section_id]: true,
      }));
    }
  };

  const handleAccordionClick = (sectionId) => {
    setAccordionState((prevState) => ({
      ...prevState,
      [sectionId]: !prevState[sectionId],
    }));
  };

  return (
    <div className="videos-container">
      <div className="main-content">
        {selectedVideo ? (
          <>
            <div className="video-header">
              <h3>{selectedVideo.title}</h3>
            </div>
            <ReactPlayer
              url={selectedVideo.url}
              controls
              width="145vh"
              height="65vh"
              onEnded={handleMarkAsWatchedAndNext}
            />
            <div className="video-content">
              <p>{selectedVideo.content}</p>
              {!watchedVideos[selectedVideo.video_id] ? (
                <div className="mark-as-watched">
                  <button onClick={() => toggleWatchedStatus(selectedVideo.video_id)}>
                    Marcar como visto y continuar con el siguiente video
                  </button>
                </div>
              ) : (
                <div className="mark-as-watched">
                  <button onClick={() => toggleWatchedStatus(selectedVideo.video_id)}>
                    Desmarcar como visto y continuar con el siguiente video
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <p>No hay un video seleccionado</p>
        )}
      </div>
      <div className="SideBarVideos">
        {videosData && videosData.length > 0 ? (
          videosData.map((section) => (
            <div key={section.section_id}>
              <button
                onClick={() => handleAccordionClick(section.section_id)}
                className={accordionState[section.section_id] ? 'active-section' : ''}
              >
                <div className="sequence-box">{section.section_sequence_number}</div>
                {section.section_name}
              </button>
              {accordionState[section.section_id] && section.videos && section.videos.length > 0 ? (
                section.videos.map((video) => (
                  <div
                    key={video.video_id}
                    onClick={() => setSelectedVideo(video)}
                    className="video-item"
                  >
                    <div className="sequence-box">{video.sequence_number}</div>
                    <div className="video-thumbnail" style={{ backgroundImage: `url(${video.url})` }}>
                    </div>
                    <span>{video.title}</span>
                    {watchedVideos[video.video_id] && <div className="watched-check checked">✔</div>}
                  </div>
                ))
              ) : (
                accordionState[section.section_id] && <p>El administrador no ha agregado videos en esta sección aún.</p>
              )}
            </div>
          ))
        ) : (
          <p>No se ha agregado ninguna sección aún</p>
        )}
      </div>
    </div>
  );
};

export default Videos;
