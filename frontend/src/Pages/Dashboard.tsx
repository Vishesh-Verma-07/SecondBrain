import Button from '../components/ui/Button2'
import { Card } from '../components/ui/Card'
import { CreateContentModal } from '../components/CreateContentModal'
import { Sidebar } from '../components/SideBar'
import PlusIcon from '../icons/Plusicon'
import ShareIcon from '../icons/Shareicon'
import { useState } from "react";


function Dashboard() {

  const [modalOpen, setModalOpen] = useState(false)


  return (
    <div>
      <Sidebar />

      <div className="p-4 ml-64  min-h-screen bg-gray-100">
        <CreateContentModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
        />
        <div className="flex justify-end">
          <Button
            onClick={() => {
              setModalOpen(true);
            }}
            variant="secondary"
            size="md"
            text="Add Content"
            startIcon={<PlusIcon />}
          />
          <Button
            variant="primary"
            size="md"
            text="Add Content"
            startIcon={<ShareIcon />}
          />
        </div>
        {/* <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 grid-flow-row-dense'> */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 auto-rows-[135px]">
          <Card
            title="project ideas"
            link="https://twitter.com/user/status/1875218603966136424"
            type="twitter"
          />
          <Card
            title="Reawaking"
            link="https://www.youtube.com/embed/rzbjF2DRv1c?si=PTIVENNb7kqitV2F"
            type="youtube"
          />
          <Card
            title="project ideas"
            link="https://twitter.com/user/status/1875218603966136424"
            type="twitter"
          />
          <Card
            title="Reawaking"
            link="https://www.youtube.com/embed/rzbjF2DRv1c?si=PTIVENNb7kqitV2F"
            type="youtube"
          />
          <Card
            title="project ideas"
            link="https://twitter.com/user/status/1875218603966136424"
            type="twitter"
          />
          <Card
            title="Reawaking"
            link="https://www.youtube.com/embed/rzbjF2DRv1c?si=PTIVENNb7kqitV2F"
            type="youtube"
          />
          <Card
            title="project ideas"
            link="https://twitter.com/user/status/1875218603966136424"
            type="twitter"
          />
          <Card
            title="Reawaking"
            link="https://www.youtube.com/embed/rzbjF2DRv1c?si=PTIVENNb7kqitV2F"
            type="youtube"
          />
        </div>
      </div>
    </div>
  );
  
}

export default Dashboard
