

export const statusData =[
    {value: '', name: 'All'},
    // {value: 'pending', name: 'Pending'},
    {value: 'claimed', name: 'Claimed'},
    {value: 'to-claim', name: 'Unclaimed'},
    // {value: 'approved', name: 'Approved'},
]
  
const statusColor = (data: string): string => {
    switch (data.toLowerCase()) {
      case "claimed":
        return "uppercase text-green-500";
      case "to-claim":
        return "uppercase text-red-500";
      case "approved":
        return "uppercase text-orange-500";
      default:
        return "";
    }
  };
  
  export default statusColor;
  