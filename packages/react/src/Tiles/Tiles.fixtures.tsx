import React from 'react'
import {MarkGithubIcon} from '@primer/octicons-react'
import {VisualStudioCodeLogo} from '../fixtures/third-party-logos/VisualStudioCodeLogo'
import {VisualStudioLogo} from '../fixtures/third-party-logos/VisualStudioLogo'
import {AzureLogo} from '../fixtures/third-party-logos/AzureLogo'
import {MicrosoftLogo} from '../fixtures/third-party-logos/MicrosoftLogo'
import {MicrosoftCopilotLogo} from '../fixtures/third-party-logos/MicrosoftCopilotLogo'

export const tileItems: Array<{name: string; href?: string; icon: React.ReactNode}> = [
  {
    name: 'GitHub',
    href: 'https://github.com',
    icon: <MarkGithubIcon size={44} />,
  },
  {
    name: 'VS Code',
    href: 'https://code.visualstudio.com',
    icon: <VisualStudioCodeLogo width="44" height="44" />,
  },
  {
    name: 'Visual Studio',
    href: 'https://visualstudio.microsoft.com',
    icon: <VisualStudioLogo width="44" height="44" />,
  },
  {
    name: 'Azure',
    href: 'https://azure.microsoft.com',
    icon: <AzureLogo width="44" height="44" />,
  },
  {
    name: 'Microsoft',
    href: 'https://microsoft.com',
    icon: <MicrosoftLogo width="44" height="44" />,
  },
  {
    name: 'Microsoft Copilot',
    href: 'https://copilot.microsoft.com',
    icon: <MicrosoftCopilotLogo width="44" height="44" />,
  },
  {
    name: 'VS Code',
    href: 'https://code.visualstudio.com',
    icon: <VisualStudioCodeLogo width="44" height="44" />,
  },
  {
    name: 'Visual Studio',
    href: 'https://visualstudio.microsoft.com',
    icon: <VisualStudioLogo width="44" height="44" />,
  },
]
