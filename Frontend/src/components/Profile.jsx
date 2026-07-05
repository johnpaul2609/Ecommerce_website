import { useEffect, useState } from "react";

function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        "https://ecommerce-website-7rjn.onrender.com/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      setName(data.name || "");
      setEmail(data.email || "");
      setPhone(data.phone || "");
      setAddress(data.address || "");
    } catch (error) {
      console.error(error);
    }
  };

  const updateProfile = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        "https://ecommerce-website-7rjn.onrender.com/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name,
            phone,
            address,
          }),
        }
      );

      const data = await response.json();

      alert(data.message || "Profile Updated Successfully");

      setIsEditing(false);
    } catch (error) {
      console.error(error);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-8">
          My Profile
        </h2>

        {!isEditing ? (
          <div className="space-y-5">

            <div>
              <p className="text-gray-500">Name</p>
              <p className="font-semibold text-lg">{name}</p>
            </div>

            <div>
              <p className="text-gray-500">Email</p>
              <p className="font-semibold text-lg">{email}</p>
            </div>

            <div>
              <p className="text-gray-500">Phone</p>
              <p className="font-semibold text-lg">
                {phone || "Not Added"}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Address</p>
              <p className="font-semibold text-lg">
                {address || "Not Added"}
              </p>
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              Edit Profile
            </button>

          </div>
        ) : (
          <div className="space-y-5">

            <div>
              <label className="block mb-2 font-medium">
                Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Email
              </label>

              <input
                type="email"
                value={email}
                readOnly
                className="w-full border rounded-lg p-3 bg-gray-100"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Phone
              </label>

              <input
                type="text"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Address
              </label>

              <textarea
                rows="4"
                value={address}
                onChange={(e) =>
                  setAddress(e.target.value)
                }
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div className="flex gap-3">

              <button
                onClick={updateProfile}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
              >
                Save Changes
              </button>

              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600"
              >
                Cancel
              </button>

            </div>

          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;