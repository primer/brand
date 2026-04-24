import {generateLLMsTxt} from '@primer/doctocat-nextjs/llms'

export const dynamic = 'force-static'

export async function GET() {
  const content = await generateLLMsTxt()

  return new Response(content, {
    headers: {'Content-Type': 'text/plain; charset=utf-8'},
  })
}
