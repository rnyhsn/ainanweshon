import Article from '@/components/frontend/home/Article';
import Career from '@/components/frontend/home/Career';
import Featured from '@/components/frontend/home/Featured'
import Global from '@/components/frontend/home/Global';



const HomePage = async () => {
  
  return (
    <div className="flex flex-col gap-5">
      <Featured />
      <Article />
      <Global />
      <Career />
    </div>
  )
}

export default HomePage
