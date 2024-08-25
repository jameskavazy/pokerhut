
export const metadata = {
    title: "Poker Cashout Calculator",
    description: "Created by JK",
  };

export default function AuthLayout({ children }){
    return (
        <div>
            <h2>Inner Layout</h2>
            {children}
        </div>
    );
}