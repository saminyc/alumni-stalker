"use client"
import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Users, Building, GraduationCap, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CollegeSearch } from "./components/college-search"

export default function AlumniFinder() {
  const [isLoading, setIsLoading] = useState(false)
  const [searchData, setSearchData] = useState({
    position: "",
    company: "",
    college: "",
  })
  const [isSearching, setIsSearching] = useState(false)
  const [showTips, setShowTips] = useState(false)
  const [recentSearches, setRecentSearches] = useState([
    { position: "Software Engineer", company: "Google", college: "Stanford University" },
    { position: "Product Manager", company: "Microsoft", college: "UC Berkeley" },
    { position: "Data Scientist", company: "Meta", college: "MIT" },
  ])

  useEffect(() => {
    // Load recent searches from localStorage
    const savedSearches = localStorage.getItem("alumnai-recent-searches")
    if (savedSearches) {
      try {
        const parsed = JSON.parse(savedSearches)
        setRecentSearches(parsed)
      } catch (error) {
        console.error("Failed to load recent searches:", error)
      }
    }
  }, [])

  const handleSearch = async () => {
    if (!searchData.position.trim() || !searchData.company.trim() || !searchData.college.trim()) {
      alert("Please fill in all fields: Position, Company, and College")
      return
    }

    setIsSearching(true)

    // Add to recent searches if not already there
    const newSearch = { ...searchData }
    const searchExists = recentSearches.some(
      (search) =>
        search.position === newSearch.position &&
        search.company === newSearch.company &&
        search.college === newSearch.college,
    )

    if (!searchExists) {
      const updatedSearches = [newSearch, ...recentSearches.slice(0, 4)]
      setRecentSearches(updatedSearches)
      saveRecentSearches(updatedSearches)
    }

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Create LinkedIn search query
    const linkedinQuery = `site:linkedin.com/in "${searchData.college}" "${searchData.company}" "${searchData.position}"`
    const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(linkedinQuery)}`

    // Open in new tab
    window.open(googleSearchUrl, "_blank")

    setIsSearching(false)
  }

  const handleRecentSearch = (search: { position: string; company: string; college: string }) => {
    setSearchData(search)
  }

  const handleInputChange = (field: string, value: string) => {
    setSearchData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const saveRecentSearches = (searches: typeof recentSearches) => {
    try {
      localStorage.setItem("alumnai-recent-searches", JSON.stringify(searches))
    } catch (error) {
      console.error("Failed to save recent searches:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 pt-8 relative">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Users className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              AlumniStalker
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professionally stalk your college peers. Creep on alumni at your dream companies without restraining orders.
          </p>
        </div>

        {/* Main Search Card */}
        <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-blue-100">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <Search className="w-5 h-5" />
              Stalk Alumni & Connect
            </CardTitle>
            <CardDescription className="text-blue-600">
              Stalk alumni from your college with laser precision. Find out where they work before they know you're
              looking!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            {/* Search Form */}
            <div className="grid md:grid-cols-3 gap-4">
              {/* Position Field */}
              <div className="space-y-2">
                <label htmlFor="position" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Building className="w-4 h-4 text-blue-600" />
                  Position
                </label>
                <Input
                  id="position"
                  type="text"
                  placeholder="e.g., Software Engineer"
                  value={searchData.position}
                  onChange={(e) => handleInputChange("position", e.target.value)}
                  className="border-blue-200 focus:border-blue-400 focus:ring-blue-400 transition-all duration-200"
                />
              </div>

              {/* Company Field */}
              <div className="space-y-2">
                <label htmlFor="company" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Building className="w-4 h-4 text-green-600" />
                  Company
                </label>
                <Input
                  id="company"
                  type="text"
                  placeholder="e.g., Google"
                  value={searchData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  className="border-blue-200 focus:border-blue-400 focus:ring-blue-400 transition-all duration-200"
                />
              </div>

              {/* College Field */}
              <div className="space-y-2">
                <label htmlFor="college" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-purple-600" />
                  College
                </label>
                <CollegeSearch value={searchData.college} onChange={(value) => handleInputChange("college", value)} />
              </div>
            </div>

            {/* Search Button */}
            <div className="flex justify-center">
              <Button
                onClick={handleSearch}
                disabled={
                  isSearching || !searchData.position.trim() || !searchData.company.trim() || !searchData.college.trim()
                }
                className="bg-blue-600 hover:bg-blue-700 transition-all duration-200 px-8 py-3 text-lg"
                size="lg"
              >
                {isSearching ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5 mr-2" />
                    Stalk!
                  </>
                )}
              </Button>
            </div>

            <Alert>
              <AlertDescription>
                Fill in all three fields to search for alumni connections. We'll find LinkedIn profiles of people who
                attended your college and work at your target company.
              </AlertDescription>
            </Alert>

            <div className="flex items-center justify-center">
              <Button
                variant="outline"
                onClick={() => setShowTips(!showTips)}
                className="text-blue-600 border-blue-200 hover:bg-blue-50"
              >
                {showTips ? "Hide Tips" : "Show Search Tips"}
              </Button>
            </div>

            {showTips && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200 animate-in slide-in-from-top-2 duration-300">
                <h4 className="font-semibold text-blue-800 mb-2">Search Tips:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Use specific job titles for better results (e.g., "Senior Software Engineer")</li>
                  <li>• Use full company names (e.g., "Microsoft" not "MSFT")</li>
                  <li>• Try different variations of your college name if needed</li>
                  <li>• Be specific about the role you're targeting</li>
                </ul>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Searches</CardTitle>
              <CardDescription>Click on any recent search to use it again</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentSearches.map((search, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200 cursor-pointer hover:bg-blue-100 hover:scale-[1.02] transition-all duration-200"
                    onClick={() => handleRecentSearch(search)}
                  >
                    <div className="flex items-center gap-4">
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                        {search.position}
                      </Badge>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        {search.company}
                      </Badge>
                      <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                        {search.college}
                      </Badge>
                    </div>
                    <Search className="w-4 h-4 text-blue-600" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* How it Works */}
        <Card>
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto hover:bg-blue-200 transition-colors duration-200">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h3 className="font-semibold">Enter Details</h3>
                <p className="text-sm text-gray-600">
                  Fill in the position you're targeting, company you're interested in, and your college
                </p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-green-600 font-bold">2</span>
                </div>
                <h3 className="font-semibold">Find Alumni</h3>
                <p className="text-sm text-gray-600">
                  Search LinkedIn to find relevant alumni profiles working at your target company
                </p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-purple-600 font-bold">3</span>
                </div>
                <h3 className="font-semibold">Connect</h3>
                <p className="text-sm text-gray-600">Reach out to alumni with personalized connection requests</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Networking Tips */}
        <Card>
          <CardHeader>
            <CardTitle>Networking Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm">
                  <strong>Personalize your message:</strong> Mention your shared college and specific reasons for
                  reaching out
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm">
                  <strong>Be specific:</strong> Ask for advice rather than directly asking for job referrals
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm">
                  <strong>Follow up appropriately:</strong> Send a thank you message and keep them updated on your
                  progress
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
