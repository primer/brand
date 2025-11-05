import React from 'react'
import type {Meta} from '@storybook/react'
import {Footnotes} from '.'
import {InlineLink} from '../'

const meta: Meta<typeof Footnotes> = {
  title: 'Components/Footnotes/Features',
  component: Footnotes,
}

export const CitationsWithLink = () => (
  <Footnotes>
    <Footnotes.Item href="#">There are now 100 million developers around the world using GitHub. </Footnotes.Item>
    <Footnotes.Item href="#">
      This factor is based on data from the industry&apos;s longest running analysis of fix rates Veracode State.
    </Footnotes.Item>
    <Footnotes.Item href="#">
      Authentication with SAML single sign-on (SSO) available for organizations using GitHub Enterprise Cloud.
    </Footnotes.Item>
  </Footnotes>
)

export const DisclaimerVariant = () => (
  <Footnotes as="div">
    <Footnotes.Item>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean non facilisis tortor. Pellentesque rhoncus blandit
      posuere. Sed eget mi finibus, fermentum turpis vitae, eleifend dolor. Maecenas viverra neque at cursus faucibus.
      Nam tempus enim quis augue pulvinar finibus. Integer accumsan turpis eget mauris pretium, non dapibus orci cursus.
      Ut in sollicitudin dui, eu tincidunt nunc. Donec ut placerat ex. In ullamcorper nibh eu sapien convallis bibendum.
      Sed diam leo, rhoncus non viverra nec, ullamcorper quis arcu.
    </Footnotes.Item>
    <Footnotes.Item>
      Etiam scelerisque turpis at massa <InlineLink href="#">pellentesque</InlineLink>, ut pretium lorem iaculis.
      Pellentesque feugiat nisi quis viverra posuere. Integer eu pulvinar ligula, lacinia sollicitudin libero. Etiam in
      cursus lacus, vitae vestibulum elit. Fusce quis purus a urna placerat dignissim non id lectus. Suspendisse
      malesuada nisi eget nibh tempus, et sollicitudin tortor posuere. Fusce id consectetur purus, sit amet faucibus
      orci. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin nisl vel felis tempor, quis
      porttitor diam elementum. Integer vel enim eget urna ullamcorper euismod eget quis nisl. Pellentesque nec erat
      tincidunt, dignissim ligula ut, consectetur lectus. Sed scelerisque urna maximus varius mollis. Ut dictum sed nibh
      id fermentum. Ut hendrerit accumsan tortor, eu tincidunt mauris blandit in. Suspendisse ut velit in felis molestie
      euismod. Nam vitae dui a justo lacinia semper.
    </Footnotes.Item>
    <Footnotes.Item>
      Nam sed dictum leo. Aliquam ac quam rhoncus, elementum mi vitae, aliquet sapien. Maecenas blandit, lectus et
      malesuada volutpat, <InlineLink href="#">purus arcu faucibus turpis, vitae tincidunt</InlineLink> velit sem sed
      nulla. Donec aliquet ligula neque, eget posuere mauris venenatis vulputate. Sed sit amet velit eu justo placerat
      consequat. Proin eget imperdiet mauris. Integer interdum gravida augue ac vehicula. Sed maximus ex vitae elementum
      scelerisque.
    </Footnotes.Item>
  </Footnotes>
)

export default meta
