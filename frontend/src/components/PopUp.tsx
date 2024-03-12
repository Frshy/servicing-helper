export default function PopUp({ className, children }: any) {
    return (
        <div className={`w-fit h-fit shadow-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg border-blue-600 md:border-t-2 ${className}`}>
            {children}
        </div>
    )
}