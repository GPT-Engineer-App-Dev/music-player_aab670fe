import React, { useState, useRef } from "react";
import { Box, Button, Flex, Heading, IconButton, Image, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Text, VStack } from "@chakra-ui/react";
import { FaPlay, FaPause, FaForward, FaBackward, FaVolumeUp } from "react-icons/fa";

const tracks = [
  {
    title: "Song 1",
    artist: "Artist 1",
    audioSrc: "https://example.com/song1.mp3",
    imageSrc: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFsYnVtJTIwY292ZXJ8ZW58MHx8fHwxNzEzNDA5MzcxfDA&ixlib=rb-4.0.3&q=80&w=1080",
  },
  {
    title: "Song 2",
    artist: "Artist 2",
    audioSrc: "https://example.com/song2.mp3",
    imageSrc: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFsYnVtJTIwYXJ0d29ya3xlbnwwfHx8fDE3MTM0MDkzNzJ8MA&ixlib=rb-4.0.3&q=80&w=1080",
  },
  // Add more tracks here
];

const Index = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex === 0 ? tracks.length - 1 : prevIndex - 1));
    setIsPlaying(true);
  };

  const handleVolumeChange = (value) => {
    setVolume(value);
    audioRef.current.volume = value;
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const currentTrack = tracks[currentTrackIndex];

  return (
    <Box maxWidth="400px" mx="auto" mt={8}>
      <VStack spacing={4}>
        <Image src={currentTrack.imageSrc} alt="Album Cover" borderRadius="md" />
        <Heading as="h2" size="lg">
          {currentTrack.title}
        </Heading>
        <Text>{currentTrack.artist}</Text>
        <Flex width="100%" justifyContent="center" alignItems="center">
          <IconButton icon={<FaBackward />} aria-label="Previous" onClick={handlePrev} mr={4} />
          <IconButton icon={isPlaying ? <FaPause /> : <FaPlay />} aria-label={isPlaying ? "Pause" : "Play"} onClick={handlePlayPause} size="lg" />
          <IconButton icon={<FaForward />} aria-label="Next" onClick={handleNext} ml={4} />
        </Flex>
        <Slider aria-label="time-slider" min={0} max={audioRef.current?.duration || 0} value={currentTime} onChange={(value) => (audioRef.current.currentTime = value)}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <Flex width="100%" justifyContent="space-between">
          <Text>{formatTime(currentTime)}</Text>
          <Text>{formatTime(audioRef.current?.duration || 0)}</Text>
        </Flex>
        <Flex width="100%" alignItems="center">
          <FaVolumeUp />
          <Slider aria-label="volume-slider" min={0} max={1} step={0.01} value={volume} onChange={handleVolumeChange} ml={2}>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Flex>
      </VStack>
      <audio ref={audioRef} src={currentTrack.audioSrc} onEnded={handleNext} onTimeUpdate={handleTimeUpdate} autoPlay={isPlaying} />
    </Box>
  );
};

export default Index;
