import {defineWidget} from 'sanity'
import {useClient} from '@sanity/client'
import {useEffect, useState} from 'react'

export const PopularPostsWidget = defineWidget({
  name: 'popularPosts',
  type: 'popularPosts',
  title: '人気記事ランキング',
  
  render: () => {
    const [posts, setPosts] = useState<any[]>([])
    const client = useClient()

    useEffect(() => {
      const query = `*[_type == "post"] | order(viewCount desc) [0...5] {
        title,
        viewCount,
        "slug": slug.current,
        "publishedAt": publishedAt
      }`
      
      client.fetch(query).then(setPosts)
    }, [client])

    return (
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">人気記事ランキング</h2>
        <div className="space-y-2">
          {posts.map((post, index) => (
            <div key={post._id} className="flex items-center space-x-2">
              <span className="w-4 h-4 rounded-full flex-shrink-0" style={{
                backgroundColor: index < 3 ? '#00E5E0' : '#f3f4f6'
              }}></span>
              <div className="flex-1">
                <p className="font-medium">{post.title}</p>
                <p className="text-sm text-gray-500">{post.viewCount} views</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
})
