'''
    Code to join audio and video
    JoinVideoAndAudio.py

    Author:
    - Erick Bustos.

    Creation date: 16/05/2022
    Last modification date: 16/05/2022
'''

# Import everything needed to edit video clips
from moviepy.editor import *


# loading video dsa gfg intro video
clip = VideoFileClip("trial_video.MOV")

# loading audio file
audioclip = AudioFileClip("Nueva grabación 9.m4a").subclip(0, 30)

# adding audio to the video clip
videoclip = clip.set_audio(audioclip)

# showing video clip
videoclip.ipython_display()
