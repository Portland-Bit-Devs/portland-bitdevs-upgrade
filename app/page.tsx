import Link from 'next/link'
import { BitcoinCircleIcon, ArrowRightIcon } from '@bitcoin-design/bitcoin-icons-react/outline'
import { getSortedMarkdownContent, ContentType } from '@/lib/parse-markdown-files'
import MeetupName from '@/components/MeetupName'
import PostPreview from '@/components/PostPreview'
import Image from 'next/image'
import newBitDevsDefault from "../public/new-bitdevs-default.jpg"

export default function Home({}) {
  const eventsContentData = getSortedMarkdownContent(ContentType.Events)
  const postsContentData = getSortedMarkdownContent(ContentType.Posts)

  return (
    <main className="container mx-auto max-w-5xl px-4">
      <div className="border-b-gray-300 border-b py-10 md:py-20 flex flex-col gap-4 md:gap-10">
        <div className="w-40 h-40 md:w-[200px] md:h-[200px] rounded-full overflow-hidden">
          <Image src={newBitDevsDefault} alt="" width="400" height="200" className="object-cover h-full" />
        </div>

        <h1 className="font-extrabold text-4xl md:text-[100px]">
          <MeetupName />
        </h1>

        <p className="text-lg md:text-[2.5rem] md:leading-normal">
          BitDevs is a community for those interested in discussing and participating in the research and development of Bitcoin and related protocols.
        </p>
      </div>
      
      <div className="flex flex-col gap-10 border-b border-b-400 py-10">
        <h2>Upcoming and Recent Events</h2>

        {eventsContentData.map(({ id, date, title }) => (
          <PostPreview
            id={id}
            title={title}
            date={date}
            type="events"
            previewText={"Our monthly Socratic Seminar events are formatted to foster debate, information sharing and lively discussion."}
          />
        ))}

        <Link href="/events" className="flex gap-2 font-sans">
          See All Events <ArrowRightIcon className="w-6 h-6" />
        </Link>
      </div>

      <div className="flex flex-col gap-10 py-10">
        <h2>Recent Blog Posts</h2>

        {postsContentData.map(({ id, date, title }) => (
          <PostPreview
            id={id}
            title={title}
            date={date}
            type="posts"
            previewText={"Our monthly Socratic Seminar events are formatted to foster debate, information sharing and lively discussion."}
          />
        ))}

        <Link href="/posts" className="flex gap-2 font-sans">
          See All Blog Posts <ArrowRightIcon className="w-6 h-6" />
        </Link>

      </div>
    </main>
  )
}
