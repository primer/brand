---
'@primer/react-brand': patch
---

Applies a transition: none rule to `:focus` on the `<Button>` component. Ensures that the existing box-shadow on :hover does not interfere with the the :focus box-shadow.

<table>
<caption>Before/After</caption>
<tr>
<th> Version 0.12.0 </th> <th> Version 0.12.1 (current)</th> <th> PR version </th> 
</tr>
<tr>
<td valign="top">

https://user-images.githubusercontent.com/26746305/219712759-d814db66-dae2-4b74-9a48-c411cb7705c3.mov

Video shows the cursor moving over the button. When pressed and hovered off of, the `box-shadow` border appears on the button in a bottom-to-top transition animation.

Video also shows cursor hovering over button when focused, removing the `box-shadow` border before displaying it back when hovered off of.

</td>
<td valign="top">

https://user-images.githubusercontent.com/26746305/219712378-7d0f0cb7-2068-463b-a3da-548729c8f6e0.mov

Video shows cursor moving over the button. When pressed the `box-shadow` border appears over the button instantly, showing the same bottom-to-top transition effect as the previous cell example.

 </td>
<td valign="top">

https://user-images.githubusercontent.com/26746305/219712490-347af6ce-6900-496d-a6cb-bc2c0c27b453.mov

Video shows cursor moving over the button and then pressing the button. The `box-shadow` border displays over the button instantly, showing no transition animation.

</td>
</tr>
</table>
