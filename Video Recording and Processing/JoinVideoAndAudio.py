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
clip = VideoFileClip("prueba9.wav")

# loading audio file
audioclip = AudioFileClip("redacted_conversation.wav")

# removing audio from video
removed_audio_clip = clip.without_audio()

# adding audio to the video clip
videoclip = removed_audio_clip.set_audio(audioclip)
videoclip.write_videofile("final_cut.mp4")

# showing video clip
#videoclip.ipython_display()

