# Odin Project - Battle Ships Game

A simple game of battle ships.

[Live Preview](https://ignasc.github.io/odinProject-battleShipsGame/)

## Build in progress

The game is currently in development. I have reached the stage where the game can be played until one of the players wins the game by destroying all opponent ships. The game can be played by two players or against a computer controlled opponent.

## Version notes

Current version: 0.3.0

Features added:

- Ship sprites (healthy, damaged ships, missed shots on board).
- Increased number of ships to be placed.
- Two enemy difficulties: easy and normal.

## Future plans

- Refactor code to be more clean and tidy.
- Improve UI.

## Personal notes

Another fairly challenging assignment due to certain new practices and tools being implemented. Mainly:

- Test driven development, where I had to create tests for core functions.
- Intermediate git use: `rebase`, `amend`, `reset`, `stash` as well as intentional branching and merging.

So far I have become more comfortable using git cli. Two major things that allowed me to understand git better:

- learning that git commits are basically nodes in a graph with pointers that point to previous nodes and branches are just pointers to specific commit nodes.
- "git log a dog": `git log --all --decorate --oneline --graph`. A great way to visualise the current branches and commits in terminal.

While working on this project, I have, quite by accident, found an interesting git branching model that gives me some ideas on how branching can be done. It was made by [Vincent Driessen](https://nvie.com/posts/a-successful-git-branching-model/)
