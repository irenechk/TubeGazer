import { ChannelContext } from "./ChannelContext";

export function ChannelProvider({ children }) {
  const channelLinks = {
    youtube: "youtube.com/@TubeGazerCreator",
    instagram: "instagram.com/tubegazer",
    twitter: "x.com/tubegazer",
    website: "tubegazer.dev",
  };

  return (
    <ChannelContext.Provider value={channelLinks}>
      {children}
    </ChannelContext.Provider>
  );
}