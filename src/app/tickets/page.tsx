import { getTickets } from "@/actions/ticket.actions";
import { getCurrentUser } from "@/lib/current-user";
import { redirect } from "next/navigation";
import TicketItem from "@/components/TicketItem";





const TicketPage= async () =>{
  const user=await getCurrentUser();

  if(!user){
    redirect('/login');
  }
  const tickets=await getTickets();
  
  return(
     <div className="min-h-screen bg-orange-50 p-8">
    <h1 className="text-3xl font-bold text-orange-600 mb-8 text-center">
       Support Tickets
    </h1>
    {tickets.length===0 ? (
      <p className="text-center text-gray-600">
        No tickets yet
      </p>
    ) : (
      <div className="space-y-4 max-w-3xl mx-auto">
        {tickets.map((ticket)=>(
          <TicketItem key={ticket.id} ticket={ticket}/>
   
        ) )}

      </div>

    )}

  </div>
  );
};


export default TicketPage;