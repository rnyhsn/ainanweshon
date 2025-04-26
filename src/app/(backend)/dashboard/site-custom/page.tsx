import DeleteTesk from '@/components/backend/body/DeleteTesk';
import PageTitle from '@/components/backend/body/PageTitle'
import { getSiteInfos } from '@/utils/action/siteCustom'
import Image from 'next/image';
import Link from 'next/link';
import { FaRegEdit } from 'react-icons/fa';

const SiteLogoPage = async () => {
  const resp = await getSiteInfos();
  
  return (
    <div>
      <PageTitle title="Site Customization" />
      <div className="p-6 bg-gray-900 rounded-sm">
        <table className="text-left w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="py-1.5 pl-2">S.N</th>
              <th>Position</th>
              <th>Description</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {
            resp.statusCode === 200 && resp.payload.length > 0 && resp.payload.map((item: any, i: number) => (
              <tr key={i} className="even:bg-gray-950 text-sm">
              <td className="pl-2 py-1"> {i+1} </td>
              <td> {item.position} </td>
              <td> {item.description.slice(0, 60)} </td>
              <td className="py-1">
                <Image src={item.image_url} alt="" width={60} height={25} />
              </td>
              <td className="flex gap-2 pt-1">
                <Link href={`/dashboard/site-custom/${item._id}`}> <FaRegEdit className="text-lg text-blue-600" />  </Link>
                <DeleteTesk id={item._id.toString()} model='site-custom' />
              </td>
            </tr>
            ))
          }
            
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SiteLogoPage
