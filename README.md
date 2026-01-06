# Odin Project - Battle Ships Game

A simple game of battle ships.

[Live Preview](https://ignasc.github.io/odinProject-battleShipsGame/)

## Build in progress

The game is currently in development. I have reached the stage where the game can be played until one of the players wins the game by destroying all opponent ships.

## Version notes

Current version: 0.1.0

First working alpha version with core features implemented:

- Two player game
- Boards are automatically hidden so you can safely pass controls to other player.
- Option to set second player to computer (difficulty selection available to select, but not implemented in gameplay)
- Show list of ships left to place (currently two ships available: 1 off length 3 and 1 off length 2)
- Show list of ships remaining to be destroyed.

## Future plans

- Prettier UI interface
- 3 difficulty levels for computer opponent.

## Personal notes

Another fairly challenging assignment due to certain new practices and tools being implemented. Mainly:

- Test driven development, where I had to create tests for core functions.
- Intermediate git use: `rebase`, `amend`, `reset`.

So far I have become more comfortable using git cli. Two major things that allowed me to understand git better:

- learning that git commits are basically nodes in a graph with pointers that point to previous nodes and branches are just pointers to specific commits.
- "git log a dog": `git log --all --decorate --oneline --graph`. A great way to visualise the current branches and commits in terminal.

While working on this project, I have, quite by accident, found an interesting git branching model that I will slowly start to practice. It was made by [Vincent Driessen](https://nvie.com/posts/a-successful-git-branching-model/)
