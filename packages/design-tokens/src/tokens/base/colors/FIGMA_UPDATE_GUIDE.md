# Figma Color Token Update Guide

## Important: Understanding Figma Modes

When extracting color values from Figma, **each color scale has TWO modes**:
- **Mode 1** (left chip) = `light.json` values
- **Mode 2** (right chip) = `dark.json` values

The color values are **DIFFERENT** between light and dark modes!

## How to Extract Values from Figma

### Step 1: Select the Color Scale in Figma
Select the entire color scale row (all 10 values from 0-9) in the Figma design file.

### Step 2: Use get_code Tool
Use the `mcp_figma_dev_mod_get_code` tool to extract the design. This will return code with both mode values.

### Step 3: Identify Mode-Specific Values
Look for the two color chips in each color slot:
```jsx
<div className="basis-0 bg-[#ddf4ff] ..." data-name="color-chip-Mode 1" />  // light.json
<div className="basis-0 bg-[#ccf0ff] ..." data-name="color-chip-Mode 2" />  // dark.json
```

### Step 4: Extract Both Sets of Values
From the code output, extract:
- **Mode 1 values** (left chip, `color-chip-Mode 1`) → Update `light.json`
- **Mode 2 values** (right chip, `color-chip-Mode 2`) → Update `dark.json`

## Example: Blue Color Scale

### From Figma Code Output:
```jsx
// Blue/0
<div className="bg-[#ddf4ff]" data-name="color-chip-Mode 1" />  // light.json: #ddf4ff
<div className="bg-[#ccf0ff]" data-name="color-chip-Mode 2" />  // dark.json: #ccf0ff

// Blue/1
<div className="bg-[#bcecff]" data-name="color-chip-Mode 1" />  // light.json: #bcecff
<div className="bg-[#a2daff]" data-name="color-chip-Mode 2" />  // dark.json: #a2daff

// ... and so on for Blue/2 through Blue/9
```

### Result in JSON Files:

**light.json:**
```json
"blue": {
  "0": { "value": "#ddf4ff" },
  "1": { "value": "#bcecff" },
  // ... Mode 1 values
}
```

**dark.json:**
```json
"blue": {
  "0": { "value": "#ccf0ff" },
  "1": { "value": "#a2daff" },
  // ... Mode 2 values
}
```

## Common Mistakes to Avoid

1. ❌ **DO NOT** use the variable definitions alone - they only show one mode
2. ❌ **DO NOT** assume light.json and dark.json have the same values
3. ❌ **DO NOT** use the `bg-[#...]` values without checking which mode
4. ✅ **DO** extract both "color-chip-Mode 1" and "color-chip-Mode 2" values
5. ✅ **DO** update both light.json and dark.json with their respective mode values

## File Locations

- Light mode: `/packages/design-tokens/src/tokens/base/colors/light.json`
- Dark mode: `/packages/design-tokens/src/tokens/base/colors/dark.json`

## Color Scales to Update

Each color scale has 10 values (0-9):
- gray
- blue
- green
- yellow
- orange
- red
- purple
- pink
- coral
- lemon
- lime
- teal
- indigo
- cyan (if present)
