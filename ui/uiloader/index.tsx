interface UILoaderProps {
  overlay?: boolean;
}
export default function UILoader({ overlay }: UILoaderProps) {
  return (
    <div className="uiloader">
      {overlay ? <div className="uiloader-overlay"></div> : null}
      <div className="uiloader-wrapper">
        <div className="uiloader-item"></div>
        <div className="uiloader-shadow"></div>
      </div>
    </div>
  );
}