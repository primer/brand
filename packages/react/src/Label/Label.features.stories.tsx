import React from 'react'
import {ComponentMeta} from '@storybook/react'
import {Label} from '.'

export default {
  title: 'Components/Label/Features',
  component: Label
} as ComponentMeta<typeof Label>

export const Small = () => <Label size="small">Small label</Label>

export const Large = () => <Label size="large">Large label</Label>

export const Colors = () => (
  <>
    <Label>default</Label>
    <Label color="blue">blue</Label>
    <Label color="blue-purple">blue purple</Label>
    <Label color="coral">coral</Label>
    <Label color="green">green</Label>
    <Label color="green-blue">green blue</Label>
    <Label color="gray">gray</Label>
    <Label color="indigo">indigo</Label>
    <Label color="lemon">lemon</Label>
    <Label color="lime">lime</Label>
    <Label color="orange">orange</Label>
    <Label color="pink">pink</Label>
    <Label color="pink-blue">pink blue</Label>
    <Label color="purple">purple</Label>
    <Label color="purple-red">purple red</Label>
    <Label color="red">red</Label>
    <Label color="red-orange">red orange</Label>
    <Label color="teal">teal</Label>
    <Label color="yellow">yellow</Label>
  </>
)
