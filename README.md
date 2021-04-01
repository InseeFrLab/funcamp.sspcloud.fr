<p align="center">
    <img src="https://user-images.githubusercontent.com/6702424/99959108-baf09d80-2d8a-11eb-9efc-934ecd78ac2c.png">  
</p>
<p align="center">
    <br>
    <img src="https://github.com/InseeFrLab/funcamp.sspcloud.fr/workflows/.github/workflows/deploy.yaml/badge.svg">
</p>


# Regarding the Funcamp project in general. 


This repo is the source code of the [funcamp.sspcloud.fr](https://funcamp.sspcloud.fr) website.  
Inside the `docs/` are the sources for the documentation website [funcamp-funcamp.gitbook.io](https://funcamp-funcamp.gitbook.io).  

Index of the rest of the project's source code:  

| Repository | Description |
|---|-------|
| [funcamp-r-grimoire](https://github.com/InseeFrLab/funcamp-r-grimoire) | R (learnr) tutorials |
| [funcamp-r-dock](https://github.com/InseeFrLab/funcamp-r-dock) | Base docker image for learnr tutorials |
| [funcamp-r-neverending](https://github.com/InseeFrLab/funcamp-r-neverending) | Last chapter |
| [funcamp-r-icarius](https://github.com/InseeFrLab/funcamp-r-icarius) | Serious game (requires the [Solarus Game Engine](https://www.solarus-games.org/)) |
| [funcamp-r-ubuntu-solarus](https://github.com/InseeFrLab/funcamp-r-ubuntu-solarus) | Docker image of `ubuntu-desktop-lxde-vnc` including the [Solarus Game Engine](https://www.solarus-games.org/) |
| [funcamp-r-windows-solarus](https://github.com/InseeFrLab/funcamp-r-windows-solarus) | Zip archive to run the icaRius game on Windows |
| [funcamp-r-windows-grimoire-launcher](https://github.com/InseeFrLab/funcamp-r-windows-grimoire-launcher) | Ressources to set up a local drive with all the resources for Windows |

# Contributing to [funcamp.sspcloud.fr](https://funcamp.sspcloud.fr)


[funcamp.sspcloud.fr](https://funcamp.sspcloud.fr) is a react app.  
The code on this repo (`docs/` folder set aside) is the source code of the website. 

First thing, if you are not collaborator, is to fork the repo:  
![image](https://user-images.githubusercontent.com/6702424/99956971-381a1380-2d87-11eb-8b2a-803115baa4f4.png)

Then  

```bash
git clone https://github.com/InseeFrLab/funcamp.sspcloud.fr #If you have forked the repo use your username in place of InseeFrLab in the url.
cd funcamp.sspcloud.fr
yarn #Equivalent of npm install

#...Make the changes you want to make...

yarn start

#...Test your changes...
```
If everything looks good, you can submit a pull request  
```bash
git checkout -b my_changes
git add -A
git commit -am "My changes"
git push origin my_changes
```
The come back here (https://github.com/InseeFrLab/funcamp.sspcloud.fr), GitHub will automatically
suggest you open a PR.

The changes on the default branch (main) are published automatically on [funcamp.sspcloud.fr](https://funcamp.sspcloud.fr) using github action.
See workflow here: [deploy.yaml](https://github.com/InseeFrLab/funcamp.sspcloud.fr/blob/main/.github/workflows/deploy.yaml)

## More info, for those who want to understand what is going on behind the scenes.

[funcamp.sspcloud.fr](https://funcamp.sspcloud.fr) is hosted here on github using [github pages](https://pages.github.com).  
If you go over to the `Settings` page of this repo and scroll down, you will find:  
![image](https://user-images.githubusercontent.com/6702424/99955231-3f8bed80-2d84-11eb-84a3-871badf5f2a6.png)
This means that everything published on the `gh-pages` branch of this repo is public at [funcamp.sspcloud.fr](https://funcamp.sspcloud.fr).  

There is a script setup that takes the `build` folder and publish it over to `gh-page` all you have to do is run:  
```bash
yarn run deploy
```

NOTE: With use [git LFS](https://git-lfs.github.com) to avoid tracking the assets (images and vieos)

![image](https://user-images.githubusercontent.com/6702424/100550183-78423000-3278-11eb-9e7b-72c252d83112.png)


# Contributing to [funcamp-funcamp.gitbook.io](https://funcamp-funcamp.gitbook.io) 

The documentation website is not hosted via github page but with [gitbook.com](https://www.gitbook.com) 
the easier way to contribute to the documentation is to request access to the GitBook space to one
of the maintainers by opening an issue. 

Once logged in you will get access to a full editor, no need to mess around with the code 😉  
![image](https://user-images.githubusercontent.com/6702424/99957720-719f4e80-2d88-11eb-949b-a2816213b6ef.png)

The sources for the pages, however, are synced bidirectionally in the `docs/` folder. 
In consequence it is also possible to modify directly, the markdown (`.md`) files in the `docs/` folder directly,
the changes will be published automatically.  

For publishing translation or new version of the documentation without suppressing the previous one, there is [the variation feature of gitbook](https://docs.gitbook.com/editing-content/variants)
