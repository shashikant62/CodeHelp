import React, {
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react';

export const VideoPlayer = ({ user }) => {
  const ref = useRef();

  useEffect(() => {
    user.videoTrack.play(ref.current);
  }, []);

  return (
    <div>
      <div className='vedio_display'
        ref={ref}
        style={{ width: '120px', height: '120px',border:'solid',margin:'3px', display:'flex', flexDirection:'column', borderColor:"white"}}
      ></div>
    </div>
  );
};
