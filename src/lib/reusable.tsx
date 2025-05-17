

export const statusData =[
    {value: '', name: 'All'},
    // {value: 'pending', name: 'Pending'},
    {value: 'claimed', name: 'Claimed'},
]
  
const statusColor = (data: string): string => {
    switch (data.toLowerCase()) {
      case "pending":
        return "uppercase text-blue-600";
      case "claimed":
        return "uppercase text-green-500";
      case "expired":
        return "uppercase text-red-500";
      default:
        return "";
    }
  };
  
  export default statusColor;
  