'''
    Code to join audio and video
    JoinVideoAndAudio.py

    Author:
    - Erick Bustos.
    
    Adapted by:
    - Jacqueline Zavala

    Creation date: 16/05/2022
    Last modification date: 22/05/2022
'''

# Import everything needed to edit video clips
from moviepy.editor import *

# loading video dsa gfg intro video
clip = VideoFileClip("sample_recording.mp4")

# loading audio file
audioclip = AudioFileClip("redacted_conversation.wav")

# Eemoving audio from video. This is not necessary as a copy of the object with the new audio track is created.
# removed_audio_clip = clip.without_audio()

# adding audio to the video clip
videoclip = clip.set_audio(audioclip)
videoclip.write_videofile("final_cut.mp4")

# showing video clip
#videoclip.ipython_display()

