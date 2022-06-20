# ADR 1. Source (and origin) of truth for Primer Brand

Date: 2022-06-19

## Status

Proposed

## Decision

Use design tokens as the source of truth for all design data and logic in Primer Brand.

Tokens (also referred to as Primitives) will serve as a shared data layer between Figma and React Libraries, with Figma providing the origin of said truth.

![diagram of source of truth](https://user-images.githubusercontent.com/13340707/174580541-2ff70d42-e656-4238-8832-51c9fb0dce41.jpg)

## Context

Primer Brand needs to provide an expansive, yet architecturally unified Design System experience for GitHub Site Designers, Site Builders and maintainers.

Its React implementation for example; must optimize for visual and logical parity with its corresponding Figma library.

This is crucial for delivering on the primary customer use-case, which is facilitating an efficient hand-off between Brand Designers and Marketing Engineers.

Ideally, the React library should operate as a the functional render-layer of pre-determined design data, rather than make opinionated decisions of its own.

### Origin of truth

To date, Primer Brand's Figma Library has been the starting point for initial component design and artwork, which is later translated into code. This design-first approach has become increasingly important as we shift-left on accessibility earlier in our design process.

Figma however, is unsuitable as a source of truth for the code. It lacks the requisite qualities for data persistance and durability. Data retrieval also becomes more expensive as the data is only accessible through an API.

Primer Brand maintainers will - despite this - refer to the Figma Library as the _origin of truth_ for the code, in acknowledgement that design language will rarely - if ever - be established in code first.

This is in contrast to other areas of Primer, where design is occasionally established in code first, or the source of truth is unclear.

Primer Brand attempts to make the creation of data predictable and linear, by hoisting its governance and precedence to Figma while cascading those decisions back down to the code using a persistent data layer.

### Source of truth

To achieve the desired synchronization of React and Figma libraries, a common _data layer_ is shared between them.

Design tokens stored as JSON provide a suitable, framework-agnostic interchange format between Figma and JavaScript-based frameworks like React. They are deterministic and offer performant interfaces for design logic.

We store key design decisions in key-value pairs, the contents of which are inferred initially from Figma designs.

Design tokens also offer us durable and scalable ways to grow the system, as they can be used as a source of truth for a variety of programming languages. Should the need arise to create visual and logical design parity in our ViewComponents, the same design tokens can be used to fan out to those components.

## Consequences

- Primer Brand maintainers will encourage all new and/or major design decisions to be explored and ratified in Figma or Design Tokens before they are applied to the Framework code.

- Figma may describe the initial vision or design strategy, but design tokens should be used in the longer term to synchronize design data between mediums.

- A dedicated Figma plugin will be required to allow Figma users to interface with the source of truth. The React library is co-located to the tokens and already compatible with the interchange format.

## Actions

- [ ] Add a Figma plugin to interface and synchronize with the source of truth.
- [ ] Write contribution guidelines for the source of truth.
