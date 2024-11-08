const WindowFrame = () => {
  const handleClick = (event: React.MouseEvent) => {
    const btn = event.target as HTMLButtonElement;
    switch (btn.id) {
      case "close": {
        return window.electron.sendFrameAction("CLOSE");
      }
      case "minimize": {
        return window.electron.sendFrameAction("MINIMIZE");
      }
      case "maxmize": {
        return window.electron.sendFrameAction("MAXIMIZE");
      }
    }
  };

  return (
    <header>
      <button id="close" onClick={handleClick} />
      <button id="minimize" onClick={handleClick} />
      <button id="maxmize" onClick={handleClick} />
    </header>
  );
};

export default WindowFrame;
