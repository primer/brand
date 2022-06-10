---
'@primer/react-brand': minor
---

- Adds `River` component
- Renames `LinkButton` to `Button` :warning: (see below)
- Button supports polymorphism and can be used `as` either `a` or `button`


### `River`


**NEW** Component :sparkles: 

<table>
<tr>
<th> Before</th> <th> After</th>
</tr>
<tr>
<td valign="top">❌</td>
<td valign="top">

```jsx
// import {River} from "@primer/react-brand";

<River>
    <River.Visual>
        <img
        src="https://via.placeholder.com/600x400/f5f5f5/f5f5f5.png"
        alt="placeholder, blank area with an off-white background color"
        />
    </River.Visual>
    <River.Content>
        <Heading>Heading</Heading>
        <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit
        ullamcorper id. Aliquam luctus sed turpis felis nam pulvinar risus
        elementum.
        </Text>
        <Link href="#">Call to action</Link>
    </River.Content>
</River>
```

</td>
</tr>
</table>

See more examples in our documentation.
https://primer.style/react-brand/components/River


### `LinkButton`
> **Warning**
> The changes below should be considered a breaking change for anyone relying on `LinkButton`, but as we are shipping a pre-v1 library, this has been marked as a `minor` release rather than `major`. Please remember to update your usage per the below example.


<table>
<tr>
<th> Before</th> <th> After</th>
</tr>
<tr>
<td valign="top">

```jsx
//import { LinkButton } from '@primer/react-brand';

<LinkButton href="#">Sign up</LinkButton>
```

</td>
<td valign="top">

```jsx
//import { Button } from '@primer/react-brand';

<Button as="a" href="#">Sign up</Button>
```

</td>
</tr>
<tr>
<td valign="top">

❌ 

</td>
<td valign="top">

```jsx
//import { Button } from '@primer/react-brand';

<Button onClick={handler}>Sign Up</Button>
```

</td>
</tr>

</table>


