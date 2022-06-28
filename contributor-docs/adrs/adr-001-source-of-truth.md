# ADR 1. Source (and origin) of truth for Primer Brand

Date: 2022-06-19

## Status

Proposed

## Decision

Use design tokens as the source of truth for reusable design data and logic in Primer Brand.

Tokens (also referred to as [Primitives](https://github.com/primer/primitives)) will serve as a shared data layer between Figma and React Libraries, with Figma providing the origin of said truth.

![diagram of source of truth](https://user-images.githubusercontent.com/13340707/174588236-91fc9ea3-71e8-4780-b5aa-8d74a583e624.jpg)

## Context

Primer Brand needs to provide an expansive, yet architecturally unified Design System experience for GitHub Site Designers, Site Builders and maintainers.

Its React implementation for example, must optimize for visual and logical parity with its corresponding Figma library.

This is crucial for delivering on the primary customer use-case, which is facilitating an efficient hand-off process between Brand Designers and Marketing Engineers.

Ideally, the React library should operate as the functional render-layer for pre-determined design data, rather than make opinionated decisions of its own. This is to avoid making high-level data decisions too downstream inside an abstraction, which makes synchronization attempts across other mediums more challenging.

### Origin of truth

To date, Primer's Figma Library has been the starting point for design system component ideation and artwork, which is later translated into code. This design-first approach has become increasingly important as we shift-left on accessibility earlier in our design process.

Figma however, is unsuitable as a source of truth for the code. It lacks the requisite qualities for data persistance and durability. Data retrieval also becomes more expensive as the data is only accessible through an API.

Primer Brand maintainers will - despite this - refer to the Figma Library as the _origin of truth_ for the code, in acknowledgement that design language will rarely - if ever - be established in code first.

This is in contrast to other areas of Primer, where design is occasionally established in code first, or the source of truth is unclear.

Primer Brand attempts to make the creation of data predictable and linear, by hoisting its governance and precedence to Figma while cascading those decisions back down to the code using a persistent data layer.

### Source of truth

To achieve the desired synchronization of React and Figma libraries, a common _data layer_ is shared between them.

Design tokens stored as JSON provide a suitable, framework-agnostic interchange format between Figma and JavaScript-based frameworks like React. They are deterministic and offer performant interfaces for design logic.

We store key design decisions in key-value pairs, the contents of which are inferred initially from Figma designs.

Design tokens also offer us durable and scalable ways to grow the system, as they can be used as a source of truth for a variety of programming languages. Should the need arise to create visual and logical design parity in our ViewComponents, the same design tokens can be used to fan out to those components.

## Alternative approaches

Primer Brand is already operating in the proposed manner, where design language is established in Figma first, then converted to tokens with React implementation shipping last.

As an alternative, we could design and prototype directly in code first and ratify those decisions later in Figma.

Doing this creates several problems, however:

- Brand art direction is usually defined and governed by the Brand Design team. They work directly with Figma as opposed to code. Achieving sign-off through PRs could be logistically expensive and inconvenient.
- Ideation and experimental artwork is often produced by Designers in Figma first due to ease-of-use and fewer barriers to entry.
- Designing in code is not inclusive of team skill-sets and preferences, where designers may be unable to operate at peak efficiency in code, and vice-versa for engineers.
- Shifting-left on accessibility means bringing audits, reviews and recommendations into the design phase as early as possible. Primer already has a distinction between `A11Y Design review` and `A11Y Eng reviews`.
- Design becomes a side-effect of Primer Brand, rather than a first-class citizen.
- Additional overhead for designers to review and sign off design decions, and similarly more work required for engineers to refactor based on said feedback.

## Consequences

- Primer Brand maintainers will encourage new and/or major design decisions that are meant to be reusable aspects of the brand system to be explored and ratified in Figma or Design Tokens before they are applied to the Framework code.

- Figma may describe the initial vision or design strategy, but design tokens should be used in the longer term to synchronize design data between mediums.

- A dedicated Figma plugin will be required to allow Figma users to interface with the source of truth. The React library is co-located to the tokens and already compatible with the interchange format.

## Actions

- [ ] Configure the [Figma Tokens](https://www.figma.com/community/plugin/843461159747178978/Figma-Tokens) plugin to interface and synchronize with the source of truth.
- [ ] Write contribution guidelines for the source of truth.
